import 'package:flutter/cupertino.dart';
import 'package:meta/meta.dart';
import 'package:equatable/equatable.dart';
import 'package:mobileui/model/user.dart';

abstract class UserEvent extends Equatable {
  const UserEvent();

  @override
  List<Object> get props => [];
}

class SaveUserPressed extends UserEvent {
  final User user;

  const SaveUserPressed({@required this.user});

  @override
  List<Object> get props => [user];
}

class UpdateUserPressed extends UserEvent {
  final User user;
  final BuildContext context;

  const UpdateUserPressed({@required this.context, @required this.user});

  @override
  List<Object> get props => [context, user];
}
