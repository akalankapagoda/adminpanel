import 'package:flutter/cupertino.dart';

class User {
  final int id;
  String username;
  String name;
  String email;
  String password;

  User({
    this.id,
    this.username,
    this.name,
    this.email,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      username: json['username'],
      email: json['email'],
    );
  }

  Map<String, dynamic> toJson() {
    return <String, dynamic>{
      'id': id.toString(),
      'username': username,
      'name': name,
      'email': email,
      'password' : password
    }..removeWhere(
        (dynamic key, dynamic value) => key == null || value == null);
  }
}
