import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobileui/login/logout_button.dart';

/// A common loading indicator with it's own page to be used across the app
/// when background processes or service calls are in progress
class LoadingScreen extends StatelessWidget {
  final String title;

  LoadingScreen(this.title);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(this.title), actions: <Widget>[
        LogoutButton(),
      ]),
      body: Container(
          padding: EdgeInsets.all(10),
          child: Column(
            children: [
              Spacer(),
              Center(
                child: CircularProgressIndicator(),
              ),
              Spacer()
            ],
          )),
    );
  }
}
