import 'dart:async';

import 'package:meta/meta.dart';
import 'package:bloc/bloc.dart';

import 'package:mobileui/auth/authentication_bloc.dart';
import 'package:mobileui/auth/authentication_event.dart';
import 'package:mobileui/auth/token_repository.dart';
import 'login_event.dart';
import 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final TokenRepository tokenRepository;
  final AuthenticationBloc authenticationBloc;

  LoginBloc({
    @required this.tokenRepository,
    @required this.authenticationBloc,
  })  : assert(tokenRepository != null),
        assert(authenticationBloc != null),
        super(LoginInitial());

  @override
  LoginState get initialState => LoginInitial();

  @override
  Stream<LoginState> mapEventToState(
      LoginEvent event,
      ) async* {
    if (event is LoginButtonPressed) {
      yield LoginLoading();

      try {
        final token = await tokenRepository.authenticate(
          username: event.username,
          password: event.password,
        );

        authenticationBloc.add(LoggedIn(token: token));
        yield LoginInitial();
      } catch (error) {
        yield LoginFailure(error: error.toString());
      }
    }
  }
}