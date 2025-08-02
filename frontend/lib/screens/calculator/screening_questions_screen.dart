import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/screening_provider.dart';
import '../../models/screening_answers.dart';

class ScreeningQuestionsScreen extends StatefulWidget {
  const ScreeningQuestionsScreen({Key? key}) : super(key: key);

  @override
  State<ScreeningQuestionsScreen> createState() =>
      _ScreeningQuestionsScreenState();
}

class _ScreeningQuestionsScreenState extends State<ScreeningQuestionsScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('System Assessment'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(4),
          child: LinearProgressIndicator(
            value: (_currentPage + 1) / 12, // Total questions
          ),
        ),
      ),
      body: Consumer<ScreeningProvider>(
        builder: (context, provider, child) {
          return PageView(
            controller: _pageController,
            physics: const NeverScrollableScrollPhysics(),
            onPageChanged: (page) => setState(() => _currentPage = page),
            children: [
              _buildCurrentSituationQuestion(provider),
              _buildHomeTypeQuestion(provider),
              _buildSquareFootageQuestion(provider),
              _buildHeatingSystemQuestion(provider),
              _buildCoolingSystemQuestion(provider),
              _buildHomeAgeQuestion(provider),
              _buildPrimaryGoalsQuestion(provider),
              if (provider.answers.primaryGoals.contains('better_comfort'))
                _buildComfortProblemsQuestion(provider),
              _buildSystemPerformanceQuestion(provider),
              _buildEquipmentLocationQuestion(provider),
              _buildAirflowIssuesQuestion(provider),
            ],
          );
        },
      ),
    );
  }

  Widget _buildCurrentSituationQuestion(ScreeningProvider provider) {
    return QuestionContainer(
      question: "What's going on with your current heating and cooling system?",
      child: Column(
        children: [
          RadioListTile<String>(
            title: const Text('It stopped working (emergency replacement)'),
            value: 'emergency',
            groupValue: provider.answers.currentSituation,
            onChanged: (value) {
              provider.updateCurrentSituation(value!);
              _nextPage();
            },
          ),
          RadioListTile<String>(
            title: const Text(
                "It's working but old/inefficient (planned replacement)"),
            value: 'planned',
            groupValue: provider.answers.currentSituation,
            onChanged: (value) {
              provider.updateCurrentSituation(value!);
              _nextPage();
            },
          ),
          RadioListTile<String>(
            title: const Text("I'm planning ahead for future replacement"),
            value: 'future',
            groupValue: provider.answers.currentSituation,
            onChanged: (value) {
              provider.updateCurrentSituation(value!);
              _nextPage();
            },
          ),
          RadioListTile<String>(
            title:
                const Text("I don't have cooling/heating and want to add it"),
            value: 'new_system',
            groupValue: provider.answers.currentSituation,
            onChanged: (value) {
              provider.updateCurrentSituation(value!);
              _nextPage();
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSquareFootageQuestion(ScreeningProvider provider) {
    final controller = TextEditingController(
      text: provider.answers.squareFootage?.toString() ?? '',
    );

    return QuestionContainer(
      question: "What's the approximate square footage of your home?",
      child: Column(
        children: [
          TextField(
            controller: controller,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              labelText: 'Square Footage',
              hintText: 'e.g., 1500',
            ),
            onChanged: (value) {
              final sqft = int.tryParse(value);
              if (sqft != null) {
                provider.updateSquareFootage(sqft);
              }
            },
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed:
                provider.answers.squareFootage != null ? _nextPage : null,
            child: const Text('Continue'),
          ),
        ],
      ),
    );
  }

  void _nextPage() {
    _pageController.nextPage(
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  // Additional question builders...
}

class QuestionContainer extends StatelessWidget {
  final String question;
  final Widget child;

  const QuestionContainer({
    Key? key,
    required this.question,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            question,
            style: Theme.of(context).textTheme.headline6,
          ),
          const SizedBox(height: 32),
          child,
        ],
      ),
    );
  }
}
