package controllers

import (
	"context"
	"time"

	"medislink-backend/config"
	"medislink-backend/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func getUserCollection() *mongo.Collection {
	return config.DB.Collection("users")
}

func CreateUser(c *fiber.Ctx) error {
	c.Context().SetUserValue("Content-Type", "application/json")

	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	user.ID = primitive.NewObjectID()
	user.CreatedAt = primitive.NewDateTimeFromTime(time.Now())

	_, err := getUserCollection().InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
	}

	return c.Status(201).JSON(user)
}

func GetAllUsers(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := getUserCollection().Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch users"})
	}
	defer cursor.Close(ctx)

	var users []models.User
	if err = cursor.All(ctx, &users); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to parse users"})
	}

	return c.JSON(users)
}

func GetUserByID(c *fiber.Ctx) error {
	idParam := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	var user models.User
	err = getUserCollection().FindOne(context.Background(), bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	return c.JSON(user)
}

func UpdateUser(c *fiber.Ctx) error {
	idParam := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	var updateData models.User
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	update := bson.M{"$set": bson.M{}}
	if updateData.Name != "" {
		update["$set"].(bson.M)["name"] = updateData.Name
	}
	if updateData.Email != "" {
		update["$set"].(bson.M)["email"] = updateData.Email
	}
	if updateData.Phone != "" {
		update["$set"].(bson.M)["phone"] = updateData.Phone
	}
	if updateData.Address != "" {
		update["$set"].(bson.M)["address"] = updateData.Address
	}
	if updateData.NIK != "" {
		update["$set"].(bson.M)["nik"] = updateData.NIK
	}
	if updateData.FotoKTP != "" {
		update["$set"].(bson.M)["foto_ktp"] = updateData.FotoKTP
	}
	if updateData.FotoProfile != "" {
		update["$set"].(bson.M)["foto_profile"] = updateData.FotoProfile
	}

	_, err = getUserCollection().UpdateOne(
		context.Background(),
		bson.M{"_id": objID},
		update,
	)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update user"})
	}

	var user models.User
	err = getUserCollection().FindOne(context.Background(), bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	return c.JSON(user)
}

func DeleteUser(c *fiber.Ctx) error {
	idParam := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	_, err = getUserCollection().DeleteOne(context.Background(), bson.M{"_id": objID})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete user"})
	}

	return c.JSON(fiber.Map{"message": "User deleted"})
}
