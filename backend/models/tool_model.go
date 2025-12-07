package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type MedicalTool struct {
	ID         primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name       string             `json:"name" bson:"name"`
	CategoryID string             `json:"category_id" bson:"category_id"`

	Type       string `json:"type" bson:"type"`
	Size       string `json:"size" bson:"size"`
	Dimensions string `json:"dimensions" bson:"dimensions"`
	WeightCap  string `json:"weight_cap" bson:"weight_cap"`

	Description string `json:"description" bson:"description"`
	Condition   string `json:"condition" bson:"condition"`
	Stock       int    `json:"stock" bson:"stock"`
	Status      string `json:"status" bson:"status"`
	ImageURL    string `json:"image_url" bson:"image_url"`
}
