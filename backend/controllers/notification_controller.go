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

func CreateNotification(c *fiber.Ctx) error {
	var notif models.Notification
	if err := c.BodyParser(&notif); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	notif.ID = primitive.NewObjectID()
	notif.CreatedAt = time.Now().Format("2006-01-02 15:04:05")
	notif.IsRead = false

	coll := config.DB.Collection("notifications")
	_, err := coll.InsertOne(context.Background(), notif)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create notification"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "Notification created"})
}

func GetUserNotifications(c *fiber.Ctx) error {
	userID := c.Params("user_id")
	coll := config.DB.Collection("notifications")

	cursor, err := coll.Find(context.Background(), bson.M{"user_id": userID})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch notifications"})
	}
	defer cursor.Close(context.Background())

	var notifs []models.Notification
	cursor.All(context.Background(), &notifs)

	return c.JSON(notifs)
}

func MarkAsRead(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	coll := config.DB.Collection("notifications")
	_, err = coll.UpdateOne(context.Background(), bson.M{"_id": objID}, bson.M{"$set": bson.M{"is_read": true}})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update notification"})
	}

	return c.JSON(fiber.Map{"message": "Notification marked as read"})
}
