import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobileui/auth/authentication_bloc.dart';
import 'package:mobileui/auth/authentication_event.dart';
import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/login/logout_button.dart';
import 'package:mobileui/users/user_list/user_list_bloc.dart';
import 'package:mobileui/users/user_list/user_list_page.dart';
import 'package:mobileui/users/user_repository.dart';

class HomePage extends StatelessWidget {

  AppConfig config;
  TokenRepository tokenRepository;
  UserRepository userRepository;

  HomePage({@required this.config, @required this.tokenRepository, @required this.userRepository});

  @override
  Widget build(BuildContext context) {

    final UserListBloc userListBloc =
    BlocProvider.of<UserListBloc>(context);

    return Scaffold(
      appBar: AppBar(title: Text('Home'), actions: <Widget>[
        LogoutButton(),
      ]),
      body: Center(
        child: Column(
          children: [
            Spacer(),
            Container(
              height: 100,
              width: 350,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.teal,
                  onPrimary: Colors.white,
                  shape: const BeveledRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(5))),
                ),
                child: Text('Courses', style: TextStyle(fontSize: 35)),
                onPressed: () {

                },
              ),
            ),
            Spacer(),
            Container(
              height: 100,
              width: 350,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.teal,
                  onPrimary: Colors.white,
                  shape: const BeveledRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(5))),
                ),
                child: Text('Users', style: TextStyle(fontSize: 35)),
                onPressed: () {

                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) {
                      return UsersPage(config: config,
                          tokenRepository: tokenRepository,
                          userRepository: userRepository,
                          userListBloc: userListBloc);
                    }),
                  );


                },
              ),
            ),
            Spacer(),
            Container(
              height: 100,
              width: 350,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.teal,
                  onPrimary: Colors.white,
                  shape: const BeveledRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(5))),
                ),
                child: Text('Roles', style: TextStyle(fontSize: 35)),
                onPressed: () {
                  // authenticationBloc.add(LoggedOut());
                },
              ),
            ),
            Spacer(),
            Container(
              height: 100,
              width: 350,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.teal,
                  onPrimary: Colors.white,
                  shape: const BeveledRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(5))),
                ),
                child: Text('Privileges', style: TextStyle(fontSize: 35)),
                onPressed: () {
                  // authenticationBloc.add(LoggedOut());
                },
              ),
            ),
            Spacer(),
            Container(
              height: 100,
              width: 350,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.teal,
                  onPrimary: Colors.white,
                  shape: const BeveledRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(5))),
                ),
                child: Text('Role Privileges', style: TextStyle(fontSize: 35)),
                onPressed: () {
                  // authenticationBloc.add(LoggedOut());
                },
              ),
            ),
            Spacer(),
            Container(
              height: 100,
              width: 350,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.teal,
                  onPrimary: Colors.white,
                  shape: const BeveledRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(5))),
                ),
                child: Text('User Roles', style: TextStyle(fontSize: 35)),
                onPressed: () {
                  // authenticationBloc.add(LoggedOut());
                },
              ),
            ),
            Spacer(),
          ],
        ),
      )
    );
  }
}
