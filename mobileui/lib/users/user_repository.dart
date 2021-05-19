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

    var queryParameters = {'filter': filter};

    http.Response response = await http.get(
        Uri.http(config.apiBaseUrl, config.usersPath + config.listPath,
            queryParameters),
        headers: <String, String>{
          'Authorization': 'Bearer ' + tokenRepository.getToken()
        });

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then it is the JWT.

      var data = json.decode(response.body) as List;

      var users = data.map<User>((json) => User.fromJson(json)).toList();
      return users;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Auth Failed');
    }
  }

  Future<Object> updateUser({User user}) async {
    if (!tokenRepository.hasToken()) {
      throw Exception('Not Authorised');
    }

    http.Response response = await http.put(
        Uri.http(config.apiBaseUrl, config.usersPath),
        headers: <String, String>{
          'Authorization': 'Bearer ' + tokenRepository.getToken()
        },
        body: user.toJson());

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.

      var errorResponse = json.decode(response.body);
      throw Exception('User update failed : ' + errorResponse.message);
    }
  }

  Future<Object> addUser({User user}) async {
    if (!tokenRepository.hasToken()) {
      throw Exception('Not Authorised');
    }

    http.Response response = await http.post(
        Uri.http(config.apiBaseUrl, config.usersPath),
        headers: <String, String>{
          'Authorization': 'Bearer ' + tokenRepository.getToken()
        },
        body: user.toJson());

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.

      var errorResponse = json.decode(response.body);
      throw Exception('User insert failed : ' + errorResponse.message);
    }
  }

  Future<Object> deleteUser({User user}) async {
    if (!tokenRepository.hasToken()) {
      throw Exception('Not Authorised');
    }

    http.Response response = await http.delete(
        Uri.http(config.apiBaseUrl, config.usersPath),
        headers: <String, String>{
          'Authorization': 'Bearer ' + tokenRepository.getToken()
        },
        body: {
          "id": user.id.toString()
        });

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.

      var errorResponse = json.decode(response.body);
      throw Exception('User insert failed : ' + errorResponse.message);
    }
  }
}
