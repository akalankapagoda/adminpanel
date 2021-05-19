import 'package:flutter/material.dart';

/// A loading indicator for home page
class LoadingIndicator extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Center(
        child: CircularProgressIndicator(),
      );
}
