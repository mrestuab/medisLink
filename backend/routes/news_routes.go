package routes

import (
	"medislink-backend/controllers"
	"medislink-backend/middlewares"

	"github.com/gofiber/fiber/v2"
)

func NewsRoutes(app *fiber.App) {
	api := app.Group("/api/news")
	api.Use(middlewares.JWTProtected())

	api.Post("/", controllers.CreateNews)
	api.Get("/", controllers.GetAllNews)
	api.Put("/:id", controllers.UpdateNews)
	api.Delete("/:id", controllers.DeleteNews)
}
