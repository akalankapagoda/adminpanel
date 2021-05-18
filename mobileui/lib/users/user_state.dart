import 'package:meta/meta.dart';
import 'package:equatable/equatable.dart';
import 'package:mobileui/model/user.dart';

abstract class UserState extends Equatable {
  const UserState();

  @override
  List<Object> get props => [];
}

class UserInitial extends UserState {}

class UserSaveInProgress extends UserState {
  final User user;

  UserSaveInProgress(this.user);

  @override
  List<Object> get props => [user];
}

class UserSaveCompleted extends UserState {
  final User user;

  UserSaveCompleted(this.user);

  @override
  List<Object> get props => [user];
}
