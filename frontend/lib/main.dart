import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'app.dart';
import 'providers/auth_provider.dart';
import 'providers/cart_provider.dart';
import 'providers/screening_provider.dart';
import 'providers/chat_provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => CartProvider()),
        ChangeNotifierProvider(create: (_) => ScreeningProvider()),
        ChangeNotifierProvider(create: (_) => ChatProvider()),
      ],
      child: const HVACApp(),
    ),
  );
}

// lib/app.dart
import 'package:flutter/material.dart';
import 'config/theme.dart';
import 'config/routes.dart';

class HVACApp extends StatelessWidget {
  const HVACApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HVAC Solutions',
      theme: AppTheme.lightTheme,
      debugShowCheckedModeBanner: false,
      initialRoute: Routes.home,
      onGenerateRoute: Routes.generateRoute,
    );
  }
}