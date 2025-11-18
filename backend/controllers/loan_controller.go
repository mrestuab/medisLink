package controllers

import (
	"context"
	"time"

	"medislink-backend/config"
	"medislink-backend/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateLoan(c *fiber.Ctx) error {
	var loan models.Loan
	if err := c.BodyParser(&loan); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	// Default quantity to 1 if not provided or invalid
	if loan.Quantity <= 0 {
		loan.Quantity = 1
	}

	loan.ID = primitive.NewObjectID()
	loan.LoanDate = time.Now().Format("2006-01-02")
	loan.Status = "aktif"

	coll := config.DB.Collection("loans")
	_, err := coll.InsertOne(context.Background(), loan)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create loan"})
	}

	// update stok alat sesuai quantity dipinjam
	toolColl := config.DB.Collection("medical_tools")
	_, _ = toolColl.UpdateOne(context.Background(),
		bson.M{"_id": loan.ToolID},
		bson.M{"$inc": bson.M{"stock": -loan.Quantity}},
	)

	return c.Status(201).JSON(fiber.Map{"message": "Loan created successfully", "quantity": loan.Quantity})
}

func GetAllLoans(c *fiber.Ctx) error {
	coll := config.DB.Collection("loans")

	cursor, err := coll.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch loans"})
	}
	defer cursor.Close(context.Background())

	var loans []models.Loan
	cursor.All(context.Background(), &loans)

	return c.JSON(loans)
}

func CompleteLoan(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	coll := config.DB.Collection("loans")
	_, err = coll.UpdateOne(context.Background(),
		bson.M{"_id": objID},
		bson.M{"$set": bson.M{"status": "selesai"}},
	)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update loan"})
	}

	return c.JSON(fiber.Map{"message": "Loan marked as completed"})
}
