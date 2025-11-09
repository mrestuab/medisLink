package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type MedicalTool struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	CategoryID  string             `json:"category_id" bson:"category_id"`
	Description string             `json:"description" bson:"description"`
	Condition   string             `json:"condition" bson:"condition"` // baik, rusak ringan, rusak berat
	Stock       int                `json:"stock" bson:"stock"`
	Status      string             `json:"status" bson:"status"`       // tersedia, dipinjam
	ImageURL    string             `json:"image_url" bson:"image_url"`
}
