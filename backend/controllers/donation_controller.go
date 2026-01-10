package controllers

import (
	"context"
	"strconv"
	"time"

	"medislink-backend/config"
	"medislink-backend/models"
	"medislink-backend/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateDonation(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userIDStr := claims["user_id"].(string)
	userID, _ := primitive.ObjectIDFromHex(userIDStr)

	fileHeader, err := c.FormFile("image")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Foto barang wajib diupload"})
	}
	file, _ := fileHeader.Open()
	defer file.Close()

	imageUrl, err := utils.UploadToCloudinary(file, "donations")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Gagal upload gambar"})
	}

	qty, _ := strconv.Atoi(c.FormValue("quantity"))

	donation := models.Donation{
		ID:            primitive.NewObjectID(),
		UserID:        userID,
		ToolName:      c.FormValue("tool_name"),
		Category:      c.FormValue("category"),
		Description:   c.FormValue("description"),
		PickupAddress: c.FormValue("pickup_address"),
		PickupDate:    c.FormValue("pickup_date"),
		Quantity:      qty,
		ImageURL:      imageUrl,
		Status:        "pending",
		CreatedAt:     time.Now().Format("2006-01-02 15:04:05"),
	}

	coll := config.DB.Collection("donations")
	_, err = coll.InsertOne(context.Background(), donation)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Gagal mengajukan donasi"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "Terima kasih! Donasi Anda sedang direview."})
}

func GetAllDonations(c *fiber.Ctx) error {
	coll := config.DB.Collection("donations")

	// Pipeline: Join Donation + User
	pipeline := mongo.Pipeline{
		{{Key: "$lookup", Value: bson.M{
			"from":         "users",
			"localField":   "user_id",
			"foreignField": "_id",
			"as":           "user_info",
		}}},
		{{Key: "$unwind", Value: bson.M{
			"path":                       "$user_info",
			"preserveNullAndEmptyArrays": true,
		}}},
		{{Key: "$project", Value: bson.M{
			"_id":            1,
			"tool_name":      1,
			"category":       1,
			"description":    1,
			"image_url":      1,
			"quantity":       1,
			"pickup_address": 1,
			"pickup_date":    1,
			"status":         1,
			"created_at":     1,
			"user_detail": bson.M{
				"name":  "$user_info.name",
				"phone": "$user_info.phone",
				"email": "$user_info.email",
			},
		}}},
		{{Key: "$sort", Value: bson.M{"created_at": -1}}},
	}

	cursor, err := coll.Aggregate(context.Background(), pipeline)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Gagal load data"})
	}
	defer cursor.Close(context.Background())

	var results []bson.M
	if err = cursor.All(context.Background(), &results); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Gagal parsing data"})
	}

	return c.JSON(results)
}

// [ADMIN] 2. Setujui Donasi -> Pindah ke Medical Tools
func ApproveDonation(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, _ := primitive.ObjectIDFromHex(id)

	collDonation := config.DB.Collection("donations")
	var donation models.Donation

	// 1. Cek Data Donasi
	err := collDonation.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&donation)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Data tidak ditemukan"})
	}

	if donation.Status == "approved" {
		return c.Status(400).JSON(fiber.Map{"error": "Donasi sudah diproses sebelumnya"})
	}

	// 2. Buat Data Alat Baru (Copy dari Donasi)
	newTool := models.MedicalTool{
		ID:          primitive.NewObjectID(),
		Name:        donation.ToolName,
		CategoryID:  donation.Category,
		Description: donation.Description + " (Sumber: Donasi)",
		ImageURL:    donation.ImageURL,
		Stock:       donation.Quantity,
		Status:      "tersedia",
		Condition:   "baik",
		Type:        "Donasi",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	// 3. Masukkan ke Collection 'medical_tools'
	collTools := config.DB.Collection("medical_tools")
	_, err = collTools.InsertOne(context.Background(), newTool)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Gagal update stok inventaris"})
	}

	// 4. Update Status Donasi jadi 'approved'
	_, err = collDonation.UpdateOne(
		context.Background(),
		bson.M{"_id": objID},
		bson.M{"$set": bson.M{"status": "approved"}},
	)

	return c.JSON(fiber.Map{"message": "Sukses! Barang masuk inventaris."})
}
