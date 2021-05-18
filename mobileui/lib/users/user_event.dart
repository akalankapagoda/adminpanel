import 'package:meta/meta.dart';
import 'package:equatable/equatable.dart';
import 'package:mobileui/model/user.dart';

abstract class UserEvent extends Equatable {
  const UserEvent();

  @override
  List<Object> get props => [];
}

class LoadUserListPressed extends UserEvent {
  final String filter;

  const LoadUserListPressed({@required this.filter});

  @override
  List<Object> get props => [filter];
}

class UserListLoaded extends UserEvent {
  final List<User> users;

  const UserListLoaded({@required this.users});

  @override
  List<Object> get props => [users];
}

class LoadUserPressed extends UserEvent {
  const LoadUserPressed();
}
