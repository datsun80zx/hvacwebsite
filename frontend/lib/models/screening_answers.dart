class ScreeningAnswers {
  String? currentSituation;
  String? homeType;
  int? stories;
  int? squareFootage;
  String? heatingSystemType;
  bool? hasCentralAc;
  String? homeAge;
  List<String> primaryGoals = [];
  List<String> comfortProblems = [];
  List<String> homeModifications = [];
  String? systemPerformance;
  String? equipmentLocation;
  List<String> airflowIssues = [];

  Map<String, dynamic> toJson() {
    return {
      'currentSituation': currentSituation,
      'homeType': homeType,
      'stories': stories,
      'squareFootage': squareFootage,
      'heatingSystemType': heatingSystemType,
      'hasCentralAc': hasCentralAc,
      'homeAge': homeAge,
      'primaryGoals': primaryGoals,
      'comfortProblems': comfortProblems,
      'homeModifications': homeModifications,
      'systemPerformance': systemPerformance,
      'equipmentLocation': equipmentLocation,
      'airflowIssues': airflowIssues,
    };
  }
}
