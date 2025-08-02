class CalculationResult {
  final double coolingTons;
  final int heatingBtus;
  final String method;
  final String confidence;
  final double priceRangeLow;
  final double priceRangeHigh;
  final List<String> recommendations;

  CalculationResult({
    required this.coolingTons,
    required this.heatingBtus,
    required this.method,
    required this.confidence,
    required this.priceRangeLow,
    required this.priceRangeHigh,
    required this.recommendations,
  });

  factory CalculationResult.fromJson(Map<String, dynamic> json) {
    return CalculationResult(
      coolingTons: json['coolingTons'].toDouble(),
      heatingBtus: json['heatingBtus'],
      method: json['method'],
      confidence: json['confidence'],
      priceRangeLow: json['priceRangeLow'].toDouble(),
      priceRangeHigh: json['priceRangeHigh'].toDouble(),
      recommendations: List<String>.from(json['recommendations']),
    );
  }
}
