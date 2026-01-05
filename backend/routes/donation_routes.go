package routes

import (
	"medislink-backend/controllers"
	"medislink-backend/middlewares"

	"github.com/gofiber/fiber/v2"
)

func DonationRoutes(app *fiber.App) {
	api := app.Group("/api/donations")

	// Middleware Login Wajib
	api.Use(middlewares.JWTProtected())

	api.Post("/", controllers.CreateDonation)            // User
	api.Get("/", controllers.GetAllDonations)            // Admin
	api.Put("/:id/approve", controllers.ApproveDonation) // Admin
}
