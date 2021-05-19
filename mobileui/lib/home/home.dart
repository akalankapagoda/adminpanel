import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/login/logout_button.dart';
import 'package:mobileui/users/user_list/user_list_bloc.dart';
import 'package:mobileui/users/user_list/user_list_event.dart';
import 'package:mobileui/users/user_list/user_list_page.dart';
import 'package:mobileui/users/user_repository.dart';

class HomePage extends StatelessWidget {
  AppConfig config;
  TokenRepository tokenRepository;
  UserRepository userRepository;

  HomePage(
      {@required this.config,
      @required this.tokenRepository,
      @required this.userRepository});

  @override
  Widget build(BuildContext context) {
    final UserListBloc userListBloc = BlocProvider.of<UserListBloc>(context);

    return Scaffold(
        resizeToAvoidBottomInset: false,
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
                  child: Text('Users', style: TextStyle(fontSize: 35)),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) {
                        userListBloc.add(new LoadUserListPressed(filter: null));
                        return UsersPage(
                            config: config,
                            tokenRepository: tokenRepository,
                            userRepository: userRepository,
                            userListBloc: userListBloc);
                      }),
                    );
                  },
                ),
              ),
              Spacer(),
              getDisabledButton(
                  'Courses'), // TODO: Apart from the 'Users', following entities are not handled at the moment
              Spacer(),
              getDisabledButton('Roles'),
              Spacer(),
              getDisabledButton('Privileges'),
              Spacer(),
              getDisabledButton('Role Privileges'),
              Spacer(),
              getDisabledButton('User Roles'),
              Spacer(),
            ],
          ),
        ));
  }

  Widget getDisabledButton(String name) {
    return Container(
      height: 100,
      width: 350,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          primary: Colors.white30,
          onPrimary: Colors.white,
          shape: const BeveledRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(5))),
        ),
        child: Text(name, style: TextStyle(fontSize: 35)),
        onPressed: () {},
      ),
    );
  }
}
