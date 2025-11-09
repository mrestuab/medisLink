// ...existing code...
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

// ...existing code...

// replace package-level var with a getter to avoid init-time nil DB
func getUserCollection() *mongo.Collection {
    return config.DB.Collection("users")
}

// ...existing code...
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

// ...existing code...
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

// ...existing code...
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

// ...existing code...
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