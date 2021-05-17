
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobileui/auth/authentication_bloc.dart';
import 'package:mobileui/auth/authentication_event.dart';

class LogoutButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    final AuthenticationBloc authenticationBloc =
    BlocProvider.of<AuthenticationBloc>(context);

    return Padding(
      padding: EdgeInsets.only(right: 20.0),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          primary: Colors.teal,
          onPrimary: Colors.white,
          shape: const BeveledRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(5))),
        ),
        child: Text('Logout'),
        onPressed: () {
          authenticationBloc.add(LoggedOut());
        },
      ),
    );
  }

}