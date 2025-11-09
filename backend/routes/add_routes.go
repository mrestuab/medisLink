package routes

import (
	"medislink-backend/controllers"
	"medislink-backend/middlewares"

	"github.com/gofiber/fiber/v2"
)

func AddRoutes(app *fiber.App) {
	api := app.Group("/api/adds")
	api.Use(middlewares.JWTProtected())

	api.Post("/", controllers.CreateAdd)
	api.Get("/", controllers.GetAllAdds)
	api.Put("/:id", controllers.UpdateAdd)
	api.Delete("/:id", controllers.DeleteAdd)
}
