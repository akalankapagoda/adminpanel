import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/model/user.dart';

class UserRepository {

  AppConfig config;
  TokenRepository tokenRepository;

  UserRepository({@required this.config, @required this.tokenRepository});

  Future<List<User>> getUsersList({String filter}) async {

    if (!tokenRepository.hasToken()) {
      throw Exception('Not Authorised');
    }

    http.Response response = await http.get(
        Uri.http(config.apiBaseUrl, config.usersPath + config.listPath),

        headers: <String, String>{
          'Authorization': 'Bearer ' + tokenRepository.getToken()
        });

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then it is the JWT.

      var data =  json.decode(response.body) as List;

      var users = data.map<User>((json) => User.fromJson(json)).toList();
      return users;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Auth Failed');
    }
  }
}