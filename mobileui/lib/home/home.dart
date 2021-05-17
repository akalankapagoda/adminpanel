import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobileui/auth/authentication_bloc.dart';
import 'package:mobileui/auth/authentication_event.dart';
import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/login/logout_button.dart';
import 'package:mobileui/users/user_page.dart';
import 'package:mobileui/users/user_repository.dart';

class HomePage extends StatelessWidget {

  AppConfig config;
  TokenRepository tokenRepository;

  HomePage({@required this.config, @required this.tokenRepository});

  @override
  Widget build(BuildContext context) {
    final AuthenticationBloc authenticationBloc =
        BlocProvider.of<AuthenticationBloc>(context);

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
                  final UserRepository userRepository = new UserRepository(config: config, tokenRepository: tokenRepository);

                  userRepository.getUsersList().
                  then((users) => {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) {
                        return UsersPage(config: config,
                            tokenRepository: tokenRepository,
                            userRepository: userRepository,
                            users: users);
                      }),
                    )
                  });


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
