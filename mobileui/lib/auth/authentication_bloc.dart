import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';
import 'package:bloc/bloc.dart';
import 'package:mobileui/login/login_page.dart';
import 'token_repository.dart';
import 'authentication_event.dart';
import 'authentication_state.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  final TokenRepository tokenRepository;
  BuildContext context;

  AuthenticationBloc({@required this.tokenRepository, @required this.context})
      : assert(tokenRepository != null),
        super(new AuthenticationUninitialized());

  @override
  Stream<AuthenticationState> mapEventToState(
    AuthenticationEvent event,
  ) async* {

    if (event is AppStarted) {
      final bool hasToken = await tokenRepository.hasToken();

      if (hasToken) {
        yield AuthenticationAuthenticated();
      } else {
        yield AuthenticationUnauthenticated();
      }
    }

    if (event is LoggedIn) {
      yield AuthenticationLoading();
      await tokenRepository.persistToken(event.token);
      yield AuthenticationAuthenticated();
    }

    if (event is LoggedOut) {
      yield AuthenticationLoading();
      await tokenRepository.deleteToken();

      Navigator.popUntil(context, ModalRoute.withName(Navigator.defaultRouteName));

      // Navigator.of(context).popUntil((route) => route.isFirst);

      // Navigator.push(
      //   context,
      //   MaterialPageRoute(builder: (context) {
      //     return LoginPage(tokenRepository: tokenRepository);
      //   }),
      // );
      
      
      yield AuthenticationUnauthenticated();
    }
  }
}
