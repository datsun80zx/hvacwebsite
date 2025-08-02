import 'package:flutter/material.dart';
import '../screens/home/home_screen.dart';
import '../screens/education/education_hub_screen.dart';
import '../screens/calculator/screening_questions_screen.dart';
import '../screens/equipment/equipment_list_screen.dart';
import '../screens/cart/cart_screen.dart';

class Routes {
  static const String home = '/';
  static const String educationHub = '/education';
  static const String calculator = '/calculator';
  static const String equipment = '/equipment';
  static const String cart = '/cart';
  static const String checkout = '/checkout';
  static const String scheduling = '/scheduling';
  static const String login = '/login';

  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case home:
        return MaterialPageRoute(builder: (_) => const HomeScreen());
      case educationHub:
        return MaterialPageRoute(builder: (_) => const EducationHubScreen());
      case calculator:
        return MaterialPageRoute(
            builder: (_) => const ScreeningQuestionsScreen());
      case equipment:
        return MaterialPageRoute(builder: (_) => const EquipmentListScreen());
      case cart:
        return MaterialPageRoute(builder: (_) => const CartScreen());
      default:
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(child: Text('No route defined for ${settings.name}')),
          ),
        );
    }
  }
}
