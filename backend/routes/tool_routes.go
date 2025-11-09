package routes

import (
	"medislink-backend/controllers"
	"medislink-backend/middlewares"

	"github.com/gofiber/fiber/v2"
)

func ToolRoutes(app *fiber.App) {
	api := app.Group("/api/tools")

	// Semua route butuh login
	api.Use(middlewares.JWTProtected())

	api.Post("/", controllers.CreateTool)
	api.Get("/", controllers.GetAllTools)
	api.Get("/:id", controllers.GetToolByID)
	api.Put("/:id", controllers.UpdateTool)
	api.Delete("/:id", controllers.DeleteTool)
}
