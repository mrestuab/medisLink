package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Donation struct {
	ID     primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	UserID primitive.ObjectID `json:"user_id" bson:"user_id"` // Foreign Key ke Users

	// Info Barang Donasi
	ToolName    string `json:"tool_name" bson:"tool_name"`
	Category    string `json:"category" bson:"category"`
	Description string `json:"description" bson:"description"`
	ImageURL    string `json:"image_url" bson:"image_url"`
	Quantity    int    `json:"quantity" bson:"quantity"`

	// Info Logistik
	// Kita tetap butuh alamat jemput, karena bisa jadi user mau barang diambil
	// di kantor/lokasi lain, bukan di alamat KTP-nya.
	PickupAddress string `json:"pickup_address" bson:"pickup_address"`

	// Status: "pending", "approved", "rejected"
	Status    string `json:"status" bson:"status"`
	CreatedAt string `json:"created_at" bson:"created_at"`

	// Field Virtual (Tidak disimpan di DB, tapi diisi saat GET data via Lookup)
	UserDetail *UserResponse `json:"user_detail,omitempty" bson:"user_detail,omitempty"`
}

// UserResponse is a struct representing user details for response purposes.
// You should adjust the fields according to your actual user model.
type UserResponse struct {
	Name  string `json:"name" bson:"name"`
	Email string `json:"email" bson:"email"`
	Phone string `json:"phone" bson:"phone"`
}
