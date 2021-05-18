import 'dart:async';

import 'package:flutter/material.dart';
import 'package:meta/meta.dart';
import 'package:bloc/bloc.dart';

import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/users/user_event.dart';
import 'package:mobileui/users/user_page.dart';
import 'package:mobileui/users/user_repository.dart';
import 'package:mobileui/users/user_state.dart';
import 'package:mobileui/model/user.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  final TokenRepository tokenRepository;
  final AppConfig config;
  final UserRepository userRepository;
  final BuildContext context;


  UserBloc({
    @required this.tokenRepository,
    @required this.userRepository,
    @required this.config,
    @required this.context
  })  : assert(tokenRepository != null),
        assert(userRepository != null),
        assert(config != null),
        assert(context != null),
        super(UserInitial());

  @override
  UserState get initialState => UserInitial();

  @override
  Stream<UserState> mapEventToState(
      UserEvent event,
      ) async* {
    if (event is LoadUserListPressed) {
      yield UserListLoading();

      try {
        LoadUserListPressed loadUserListPressed = event as LoadUserListPressed;
        List<User> users = await userRepository.getUsersList(filter: loadUserListPressed.filter);

        yield UserList(users);

      } catch (error) {
        yield UserLoadingFailure(error: error.toString());
      }
    }
  }
}