import 'dart:developer';
import 'dart:math';

import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobileui/auth/authentication_bloc.dart';
import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/login/logout_button.dart';
import 'package:mobileui/model/user.dart';
import 'package:mobileui/users/user_repository.dart';

class UsersPage extends StatelessWidget {

  AppConfig config;
  TokenRepository tokenRepository;
  UserRepository userRepository;
  List<User> users;

  UsersPage({
    @required this.config,
    @required this.tokenRepository,
    @required this.userRepository,
    @required this.users});

  @override
  Widget build(BuildContext context) {
    final AuthenticationBloc authenticationBloc =
    BlocProvider.of<AuthenticationBloc>(context);

    var titles = [for (var user in users ) user.name];
    var subtitles = [for (var user in users ) user.email];

    return Scaffold(
        appBar: AppBar(title: Text('Users'), actions: <Widget>[
          LogoutButton(),
        ]),
        body:


        Container(
          padding: EdgeInsets.all(10),
          child: ListView.separated(
              separatorBuilder: (BuildContext context, int index) => const Divider(),
              itemCount: titles.length,
              itemBuilder: (context, index) {
                return Card(
                    child: ListTile(
                        title: Text(titles[index]),
                        subtitle: Text(subtitles[index]),
                        leading: Icon(Icons.account_circle))
                );
                        // trailing: Icon(Icons.account_circle)));
              })
        ),
    );
  }
}