import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:mobileui/config/app_config.dart';

/// Handle saving, retrieving and clearing of the authentication token
class TokenRepository {
  AppConfig config;

  TokenRepository({@required this.config});

  String token;

  /// Parse credentials to the server and grab a token
  Future<String> authenticate({
    @required String username,
    @required String password,
  }) async {
    String credentials = username + ":" + password;
    Codec<String, String> stringToBase64 = utf8.fuse(base64);
    String encodedAuth = stringToBase64.encode(credentials);

    http.Response response = await http.post(
        Uri.http(config.apiBaseUrl, config.loginPath),
        headers: <String, String>{
          'Authorization': 'Basic ' + encodedAuth,
        });

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then it is the JWT.
      return response.body;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Auth Failed');
    }

    await Future.delayed(Duration(seconds: 1));
    return 'token';
  }

  deleteToken() {
    this.token = null;
    return;
  }

  persistToken(String token) {
    this.token = token;
    return;
  }

  bool hasToken() {
    return this.token != null;
  }

  String getToken() {
    return this.token;
  }
}
