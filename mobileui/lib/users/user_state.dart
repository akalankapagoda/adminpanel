import 'package:meta/meta.dart';
import 'package:equatable/equatable.dart';
import 'package:mobileui/model/user.dart';

abstract class UserState extends Equatable {
  const UserState();

  @override
  List<Object> get props => [];
}

class UserInitial extends UserState {}

class UserListLoading extends UserState {}

class UserLoading extends UserState {}

class UserList extends UserState {
  final List<User> users;

  UserList(this.users);

  @override
  List<Object> get props => [users];
}

class UserLoadingFailure extends UserState {
  final String error;

  const UserLoadingFailure({@required this.error});

  @override
  List<Object> get props => [error];

  @override
  String toString() => 'Failed to load user(s) { error: $error }';
}