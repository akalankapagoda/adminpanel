import 'package:flutter/cupertino.dart';
import 'package:meta/meta.dart';
import 'package:equatable/equatable.dart';
import 'package:mobileui/model/user.dart';

abstract class UserListEvent extends Equatable {
  const UserListEvent();

  @override
  List<Object> get props => [];
}

class LoadUserListPressed extends UserListEvent {
  final String filter;

  const LoadUserListPressed({@required this.filter});

  @override
  List<Object> get props => [filter];
}

class UserListInit extends UserListEvent {

  const UserListInit();
}
