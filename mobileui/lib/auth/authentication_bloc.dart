import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';
import 'package:bloc/bloc.dart';
import 'token_repository.dart';
import 'authentication_event.dart';
import 'authentication_state.dart';

/// Handle auth related event streams
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
      // Check if auth token is set
      final bool hasToken = await tokenRepository.hasToken();

      if (hasToken) {
        yield AuthenticationAuthenticated();
      } else {
        yield AuthenticationUnauthenticated();
      }
    }

    if (event is LoggedIn) {
      // Save auth token
      yield AuthenticationLoading();
      await tokenRepository.persistToken(event.token);
      yield AuthenticationAuthenticated();
    }

    if (event is LoggedOut) {
      // Remove auth token and drop to login screen
      yield AuthenticationLoading();
      await tokenRepository.deleteToken();

      Navigator.popUntil(
          context, ModalRoute.withName(Navigator.defaultRouteName));

      yield AuthenticationUnauthenticated();
    }
  }
}
