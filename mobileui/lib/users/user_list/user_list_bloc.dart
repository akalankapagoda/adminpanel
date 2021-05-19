import 'dart:async';

import 'package:flutter/material.dart';
import 'package:meta/meta.dart';
import 'package:bloc/bloc.dart';

import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/users/user_list/user_list_event.dart';
import 'package:mobileui/users/user_repository.dart';
import 'package:mobileui/users/user_list/user_list_state.dart';
import 'package:mobileui/model/user.dart';

/// Handles events stream for user list page
class UserListBloc extends Bloc<UserListEvent, UserListState> {
  final TokenRepository tokenRepository;
  final AppConfig config;
  final UserRepository userRepository;
  final BuildContext context;

  UserListBloc(
      {@required this.tokenRepository,
      @required this.userRepository,
      @required this.config,
      @required this.context})
      : assert(tokenRepository != null),
        assert(userRepository != null),
        assert(config != null),
        assert(context != null),
        super(UserListInitial());

  @override
  UserListState get initialState => UserListInitial();

  @override
  Stream<UserListState> mapEventToState(
    UserListEvent event,
  ) async* {
    if (event is LoadUserListPressed) {
      yield UserListLoading();

      try {
        LoadUserListPressed loadUserListPressed = event as LoadUserListPressed;
        List<User> users = await userRepository.getUsersList(
            filter: loadUserListPressed.filter);

        yield UserListLoaded(users);
      } catch (error) {
        yield UserLoadingFailure(error: error.toString());
      }
    } else if (event is UserListInit) {
      yield UserListInitial();
    }
  }
}
