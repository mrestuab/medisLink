package routes

import (
	"medislink-backend/controllers"
	"medislink-backend/middlewares"

	"github.com/gofiber/fiber/v2"
)

func NotificationRoutes(app *fiber.App) {
	api := app.Group("/api/notifications")
	api.Use(middlewares.JWTProtected())

	api.Post("/", controllers.CreateNotification)
	api.Get("/:user_id", controllers.GetUserNotifications)
	api.Put("/:id/read", controllers.MarkAsRead)
}
