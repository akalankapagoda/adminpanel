import 'package:equatable/equatable.dart';
import 'package:mobileui/model/user.dart';

abstract class UserState extends Equatable {
  const UserState();

  @override
  List<Object> get props => [];
}

class UserInitial extends UserState {}

class UserOperationInProgress extends UserState {
  final User user;

  UserOperationInProgress(this.user);

  @override
  List<Object> get props => [user];
}

class UserSaveCompleted extends UserState {
  final User user;

  UserSaveCompleted(this.user);

  @override
  List<Object> get props => [user];
}

class UserDeleteCompleted extends UserState {
  final User user;

  UserDeleteCompleted(this.user);

  @override
  List<Object> get props => [user];
}
