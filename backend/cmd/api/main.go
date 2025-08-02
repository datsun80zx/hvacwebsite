package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"hvacwebsite/internal/config"
	"hvacwebsite/internal/database"
	"hvacwebsite/internal/handlers"
	"hvacwebsite/internal/middleware"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Load configuration
	cfg := config.Load()

	// Initialize database
	db, err := database.Initialize(cfg.DatabaseURL)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Run migrations
	if err := database.Migrate(db); err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	// Initialize router
	router := mux.NewRouter()

	// Apply middleware
	router.Use(middleware.CORS)
	router.Use(middleware.Logging)

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(db)
	equipmentHandler := handlers.NewEquipmentHandler(db)
	calculatorHandler := handlers.NewCalculatorHandler(db)
	orderHandler := handlers.NewOrderHandler(db)
	appointmentHandler := handlers.NewAppointmentHandler(db)
	chatHandler := handlers.NewChatHandler(db)

	// Public routes
	router.HandleFunc("/api/auth/register", authHandler.Register).Methods("POST")
	router.HandleFunc("/api/auth/login", authHandler.Login).Methods("POST")
	router.HandleFunc("/api/auth/guest", authHandler.GuestCheckout).Methods("POST")

	// Equipment routes
	router.HandleFunc("/api/equipment", equipmentHandler.List).Methods("GET")
	router.HandleFunc("/api/equipment/{id}", equipmentHandler.Get).Methods("GET")
	router.HandleFunc("/api/equipment/filter", equipmentHandler.Filter).Methods("POST")

	// Calculator routes
	router.HandleFunc("/api/calculator/screening", calculatorHandler.ScreeningQuestions).Methods("GET")
	router.HandleFunc("/api/calculator/calculate", calculatorHandler.Calculate).Methods("POST")

	// Protected routes
	protected := router.PathPrefix("/api").Subrouter()
	protected.Use(middleware.Authenticate)

	// Order routes
	protected.HandleFunc("/orders", orderHandler.Create).Methods("POST")
	protected.HandleFunc("/orders/{id}", orderHandler.Get).Methods("GET")
	protected.HandleFunc("/orders/{id}/items", orderHandler.AddItem).Methods("POST")
	protected.HandleFunc("/orders/{id}/checkout", orderHandler.Checkout).Methods("POST")

	// Appointment routes
	protected.HandleFunc("/appointments/availability", appointmentHandler.GetAvailability).Methods("GET")
	protected.HandleFunc("/appointments", appointmentHandler.Schedule).Methods("POST")
	protected.HandleFunc("/appointments/{id}/verify", appointmentHandler.VerifyPhone).Methods("POST")

	// Chat routes
	router.HandleFunc("/api/chat/start", chatHandler.StartConversation).Methods("POST")
	router.HandleFunc("/api/chat/{conversationId}/message", chatHandler.SendMessage).Methods("POST")

	// WebSocket for real-time chat
	router.HandleFunc("/ws/chat/{conversationId}", chatHandler.WebSocket)

	// Admin routes
	admin := router.PathPrefix("/api/admin").Subrouter()
	admin.Use(middleware.Authenticate)
	admin.Use(middleware.RequireAdmin)

	// Start server
	log.Printf("Server starting on port %s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, router); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
