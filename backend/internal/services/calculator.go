package services

import (
	"hvacwebsite/internal/models"
)

type CalculatorService struct{}

func NewCalculatorService() *CalculatorService {
	return &CalculatorService{}
}

func (s *CalculatorService) CalculateLoad(answers models.ScreeningAnswers) models.LoadCalculationResult {
	// Rule of thumb calculations
	coolingTons := float64(answers.SquareFootage) / 500.0
	heatingBTUs := answers.SquareFootage * 40

	// Adjust based on home age
	if answers.HomeAge == "before_1960" || answers.HomeAge == "1960_1979" {
		coolingTons *= 1.15 // Older homes need more capacity
		heatingBTUs = int(float64(heatingBTUs) * 1.15)
	}

	// Price estimation (simplified for MVP)
	pricePerTon := 3000.0 // Base price per ton
	installationBase := 2000.0

	priceRangeLow := (coolingTons * pricePerTon) + installationBase
	priceRangeHigh := priceRangeLow * 2.5 // High end includes ductwork, electrical, etc.

	// Generate recommendations
	recommendations := s.generateRecommendations(answers)

	return models.LoadCalculationResult{
		CoolingTons:     coolingTons,
		HeatingBTUs:     heatingBTUs,
		Method:          "rule_of_thumb",
		Confidence:      "estimated",
		PriceRangeLow:   priceRangeLow,
		PriceRangeHigh:  priceRangeHigh,
		Recommendations: recommendations,
	}
}

func (s *CalculatorService) generateRecommendations(answers models.ScreeningAnswers) []string {
	var recommendations []string

	// Check for ductwork issues
	if contains(answers.AirflowIssues, "whistling") || contains(answers.AirflowIssues, "weak_airflow") {
		recommendations = append(recommendations, "Consider ductwork evaluation for optimal performance")
	}

	// Check for comfort issues
	if len(answers.ComfortProblems) > 2 {
		recommendations = append(recommendations, "Multiple comfort issues detected - comprehensive system evaluation recommended")
	}

	// Check for adding AC
	if !answers.HasCentralAC && contains(answers.PrimaryGoals, "adding_cooling") {
		recommendations = append(recommendations, "Adding AC may require ductwork modifications and electrical upgrades")
	}

	return recommendations
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}
