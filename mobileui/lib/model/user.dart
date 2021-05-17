import 'package:flutter/cupertino.dart';

class User {
  final int id;
  final String username;
  final String name;
  String email;

  User({
    @required this.id,
    @required this.username,
    @required this.name,
    this.email,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }
}