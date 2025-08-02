package models

import (
    "time"
    "github.com/google/uuid"
    "database/sql/driver"
)

type EquipmentType string

const (
    EquipmentTypeFurnace    EquipmentType = "furnace"
    EquipmentTypeHeatPump   EquipmentType = "heat_pump"
    EquipmentTypeAirHandler EquipmentType = "air_handler"
    EquipmentTypeMiniSplit  EquipmentType = "mini_split"
)

type Equipment struct {
    ID             uuid.UUID     `json:"id" db:"id"`
    ManufacturerID uuid.UUID     `json:"manufacturerId" db:"manufacturer_id"`
    Manufacturer   *Manufacturer `json:"manufacturer,omitempty"`
    ModelNumber    string        `json:"modelNumber" db:"model_number"`
    EquipmentType  EquipmentType `json:"equipmentType" db:"equipment_type"`
    SeriesName     string        `json:"seriesName" db:"series_name"`
    
    // Specifications
    Tonnage       float64 `json:"tonnage,omitempty" db:"tonnage"`
    BTUCooling    int     `json:"btuCooling,omitempty" db:"btu_cooling"`
    BTUHeating    int     `json:"btuHeating,omitempty" db:"btu_heating"`
    SEER2         float64 `json:"seer2,omitempty" db:"seer2"`
    EER2          float64 `json:"eer2,omitempty" db:"eer2"`
    HSPF2         float64 `json:"hspf2,omitempty" db:"hspf2"`
    AFUE          float64 `json:"afue,omitempty" db:"afue"`
    
    // Pricing
    RetailPrice float64 `json:"retailPrice" db:"retail_price"`
    
    // Features
    Features map[string]interface{} `json:"features" db:"features"`
    
    CreatedAt time.Time `json:"createdAt" db:"created_at"`
    UpdatedAt time.Time `json:"updatedAt" db:"updated_at"`
}

// internal/models/calculator.go
package models

type ScreeningAnswers struct {
    CurrentSituation    string   `json:"currentSituation"`
    HomeType           string   `json:"homeType"`
    Stories            int      `json:"stories"`
    SquareFootage      int      `json:"squareFootage"`
    HeatingSystemType  string   `json:"heatingSystemType"`
    HasCentralAC       bool     `json:"hasCentralAc"`
    HomeAge            string   `json:"homeAge"`
    PrimaryGoals       []string `json:"primaryGoals"`
    ComfortProblems    []string `json:"comfortProblems,omitempty"`
    HomeModifications  []string `json:"homeModifications,omitempty"`
    SystemPerformance  string   `json:"systemPerformance"`
    EquipmentLocation  string   `json:"equipmentLocation"`
    AirflowIssues      []string `json:"airflowIssues,omitempty"`
}

type LoadCalculationResult struct {
    CoolingTons    float64 `json:"coolingTons"`
    HeatingBTUs    int     `json:"heatingBtus"`
    Method         string  `json:"method"`
    Confidence     string  `json:"confidence"`
    PriceRangeLow  float64 `json:"priceRangeLow"`
    PriceRangeHigh float64 `json:"priceRangeHigh"`
    Recommendations []string `json:"recommendations"`
}