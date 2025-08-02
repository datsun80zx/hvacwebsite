class AppConstants {
  static const String baseUrl = 'http://localhost:8080/api';
  static const String wsUrl = 'ws://localhost:8080/ws';

  // Stripe
  static const String stripePublishableKey = 'pk_test_your_key';

  // Chat
  static const int chatMessageRetentionDays = 365;

  // Calculations
  static const double coolingTonPerSqFt = 500.0;
  static const double heatingBtuPerSqFt = 40.0;
}
