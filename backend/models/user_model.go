package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name"`
	Email     string             `json:"email" bson:"email"`
	Password  string             `json:"-" bson:"password"`
	Role      string             `json:"role" bson:"role"` // "admin" atau "user"
	Phone     string             `json:"phone" bson:"phone"`
	Address   string             `json:"address" bson:"address"`
	CreatedAt primitive.DateTime `json:"created_at" bson:"created_at"`
}
