class Equipment {
  final String id;
  final String manufacturerId;
  final Manufacturer? manufacturer;
  final String modelNumber;
  final EquipmentType equipmentType;
  final String seriesName;
  final double? tonnage;
  final int? btuCooling;
  final int? btuHeating;
  final double? seer2;
  final double? eer2;
  final double? hspf2;
  final double? afue;
  final double retailPrice;
  final Map<String, dynamic>? features;

  Equipment({
    required this.id,
    required this.manufacturerId,
    this.manufacturer,
    required this.modelNumber,
    required this.equipmentType,
    required this.seriesName,
    this.tonnage,
    this.btuCooling,
    this.btuHeating,
    this.seer2,
    this.eer2,
    this.hspf2,
    this.afue,
    required this.retailPrice,
    this.features,
  });

  factory Equipment.fromJson(Map<String, dynamic> json) {
    return Equipment(
      id: json['id'],
      manufacturerId: json['manufacturerId'],
      manufacturer: json['manufacturer'] != null
          ? Manufacturer.fromJson(json['manufacturer'])
          : null,
      modelNumber: json['modelNumber'],
      equipmentType: EquipmentType.values.firstWhere(
        (e) => e.toString().split('.').last == json['equipmentType'],
      ),
      seriesName: json['seriesName'],
      tonnage: json['tonnage']?.toDouble(),
      btuCooling: json['btuCooling'],
      btuHeating: json['btuHeating'],
      seer2: json['seer2']?.toDouble(),
      eer2: json['eer2']?.toDouble(),
      hspf2: json['hspf2']?.toDouble(),
      afue: json['afue']?.toDouble(),
      retailPrice: json['retailPrice'].toDouble(),
      features: json['features'],
    );
  }
}

enum EquipmentType { furnace, heat_pump, air_handler, mini_split }

class Manufacturer {
  final String id;
  final String name;
  final String code;

  Manufacturer({
    required this.id,
    required this.name,
    required this.code,
  });

  factory Manufacturer.fromJson(Map<String, dynamic> json) {
    return Manufacturer(
      id: json['id'],
      name: json['name'],
      code: json['code'],
    );
  }
}
