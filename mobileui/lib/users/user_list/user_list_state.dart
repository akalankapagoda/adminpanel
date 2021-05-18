import 'package:meta/meta.dart';
import 'package:equatable/equatable.dart';
import 'package:mobileui/model/user.dart';

abstract class UserListState extends Equatable {
  const UserListState();

  @override
  List<Object> get props => [];
}

class UserListInitial extends UserListState {}

class UserEditInitial extends UserListState {}

class UserListLoading extends UserListState {}

class UserListLoaded extends UserListState {
  final List<User> users;

  UserListLoaded(this.users);

  @override
  List<Object> get props => [users];
}

class UserLoadingFailure extends UserListState {
  final String error;

  const UserLoadingFailure({@required this.error});

  @override
  List<Object> get props => [error];

  @override
  String toString() => 'Failed to load user(s) { error: $error }';
}