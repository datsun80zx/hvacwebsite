package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/jmoiron/sqlx"

	"hvacwebsite/internal/models"
	"hvacwebsite/internal/utils"
)

type EquipmentHandler struct {
	db *sqlx.DB
}

func NewEquipmentHandler(db *sqlx.DB) *EquipmentHandler {
	return &EquipmentHandler{db: db}
}

func (h *EquipmentHandler) List(w http.ResponseWriter, r *http.Request) {
	query := `
        SELECT 
            e.*,
            m.id as "manufacturer.id",
            m.name as "manufacturer.name",
            m.code as "manufacturer.code"
        FROM equipment_models e
        JOIN manufacturers m ON e.manufacturer_id = m.id
        WHERE e.status = 'active'
        ORDER BY e.equipment_type, e.tonnage
    `

	var equipment []models.Equipment
	err := h.db.Select(&equipment, query)
	if err != nil {
		utils.ErrorResponse(w, "Failed to fetch equipment", http.StatusInternalServerError)
		return
	}

	utils.JSONResponse(w, equipment)
}

func (h *EquipmentHandler) Filter(w http.ResponseWriter, r *http.Request) {
	var filter struct {
		EquipmentType string  `json:"equipmentType"`
		MinTonnage    float64 `json:"minTonnage"`
		MaxTonnage    float64 `json:"maxTonnage"`
		Manufacturer  string  `json:"manufacturer"`
	}

	if err := json.NewDecoder(r.Body).Decode(&filter); err != nil {
		utils.ErrorResponse(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	query := `
        SELECT e.*, m.* 
        FROM equipment_models e
        JOIN manufacturers m ON e.manufacturer_id = m.id
        WHERE e.status = 'active'
    `
	args := make(map[string]interface{})

	if filter.EquipmentType != "" {
		query += " AND e.equipment_type = :equipment_type"
		args["equipment_type"] = filter.EquipmentType
	}

	if filter.MinTonnage > 0 {
		query += " AND e.tonnage >= :min_tonnage"
		args["min_tonnage"] = filter.MinTonnage
	}

	if filter.MaxTonnage > 0 {
		query += " AND e.tonnage <= :max_tonnage"
		args["max_tonnage"] = filter.MaxTonnage
	}

	if filter.Manufacturer != "" {
		query += " AND m.code = :manufacturer"
		args["manufacturer"] = filter.Manufacturer
	}

	query += " ORDER BY e.retail_price"

	rows, err := h.db.NamedQuery(query, args)
	if err != nil {
		utils.ErrorResponse(w, "Failed to filter equipment", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var equipment []models.Equipment
	for rows.Next() {
		var e models.Equipment
		if err := rows.StructScan(&e); err != nil {
			continue
		}
		equipment = append(equipment, e)
	}

	utils.JSONResponse(w, equipment)
}
