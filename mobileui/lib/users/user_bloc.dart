import 'dart:async';

import 'package:flutter/material.dart';
import 'package:meta/meta.dart';
import 'package:bloc/bloc.dart';

import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/users/user_event.dart';
import 'package:mobileui/users/user_list/user_list_event.dart';
import 'package:mobileui/users/user_repository.dart';
import 'package:mobileui/users/user_list/user_list_state.dart';
import 'package:mobileui/users/user_state.dart';

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
    if (event is UpdateUserPressed) {

      UpdateUserPressed updateEvent = event as UpdateUserPressed;

      yield UserSaveInProgress(updateEvent.user);

      await userRepository.updateUser(user: updateEvent.user);

      yield UserSaveCompleted(updateEvent.user);
    } else if (event is SaveUserPressed) {

      SaveUserPressed saveEvent = event as SaveUserPressed;

      yield UserSaveInProgress(saveEvent.user);

      await userRepository.addUser(user: saveEvent.user);

      yield UserSaveCompleted(saveEvent.user);
    }

  }
}