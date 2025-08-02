import 'package:flutter/material.dart';
import '../../widgets/cta/floating_cta.dart';
import '../../config/routes.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HVAC Solutions'),
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_cart),
            onPressed: () => Navigator.pushNamed(context, Routes.cart),
          ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeroSection(context),
                const SizedBox(height: 32),
                _buildEducationSection(context),
                const SizedBox(height: 32),
                _buildFeaturesSection(),
                const SizedBox(height: 100), // Space for floating CTA
              ],
            ),
          ),
          const FloatingCTA(),
        ],
      ),
    );
  }

  Widget _buildHeroSection(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: Theme.of(context).primaryColor.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(
            'Find Your Perfect HVAC System',
            style: Theme.of(context).textTheme.headline4,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          const Text(
            'Get expert guidance, accurate sizing, and transparent pricing - all online',
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () => Navigator.pushNamed(context, Routes.calculator),
            child: const Text('Start Your Assessment'),
          ),
        ],
      ),
    );
  }

  Widget _buildEducationSection(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Learn Before You Buy',
          style: Theme.of(context).textTheme.headline5,
        ),
        const SizedBox(height: 16),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          children: [
            _buildEducationCard(
              'HVAC Basics',
              'Understanding your system',
              Icons.ac_unit,
              () => Navigator.pushNamed(context, Routes.educationHub),
            ),
            _buildEducationCard(
              'Energy Efficiency',
              'Save on utility bills',
              Icons.eco,
              () => Navigator.pushNamed(context, Routes.educationHub),
            ),
            _buildEducationCard(
              'Maintenance Tips',
              'Keep your system running',
              Icons.build,
              () => Navigator.pushNamed(context, Routes.educationHub),
            ),
            _buildEducationCard(
              'Buying Guide',
              'Make the right choice',
              Icons.shopping_bag,
              () => Navigator.pushNamed(context, Routes.educationHub),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildEducationCard(
    String title,
    String subtitle,
    IconData icon,
    VoidCallback onTap,
  ) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 48),
              const SizedBox(height: 8),
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 4),
              Text(subtitle, style: const TextStyle(fontSize: 12)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFeaturesSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        ListTile(
          leading: Icon(Icons.calculate),
          title: Text('Accurate Sizing'),
          subtitle: Text('Get the right size system for your home'),
        ),
        ListTile(
          leading: Icon(Icons.attach_money),
          title: Text('Transparent Pricing'),
          subtitle: Text('See real prices before scheduling a visit'),
        ),
        ListTile(
          leading: Icon(Icons.calendar_today),
          title: Text('Easy Scheduling'),
          subtitle: Text('Book your installation online'),
        ),
        ListTile(
          leading: Icon(Icons.payment),
          title: Text('Flexible Payment'),
          subtitle: Text('Finance or pay in full - your choice'),
        ),
      ],
    );
  }
}
