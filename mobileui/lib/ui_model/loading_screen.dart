
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobileui/login/logout_button.dart';

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
            child: CircularProgressIndicator()),
      );
  }

}