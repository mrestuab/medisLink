package main

import (
    "log"
    "os"

    "github.com/gofiber/fiber/v2"
    "github.com/joho/godotenv"

    "medislink-backend/config"
    "medislink-backend/routes"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    config.ConnectDB()
    app := fiber.New()

    routes.CategoryRoutes(app)
    routes.InventoryLogRoutes(app)
	routes.AddRoutes(app)
	routes.NewsRoutes(app)
	routes.NotificationRoutes(app)
	routes.ReviewRoutes(app)
	routes.LoanRoutes(app)
	routes.ReturnRoutes(app)
	routes.ToolRoutes(app)
	routes.AuthRoutes(app)
    routes.UserRoutes(app)

    port := os.Getenv("PORT")
    app.Listen(":" + port)
}
