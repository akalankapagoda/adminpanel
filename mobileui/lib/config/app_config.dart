import 'dart:convert';

import 'package:flutter/services.dart';

/// Load app configs related to server endpoints
/// from an environment specific json
class AppConfig {
  final String apiBaseUrl;

  final String coursesPath = 'courses';
  final String usersPath = 'users';
  final String rolesPath = 'roles';
  final String privilegesPath = 'privileges';
  final String rolePrivilegesPath = 'rolePrivileges';
  final String userRolesPath = 'userRoles';
  final String loginPath = 'login';

  final String listPath = '/list';

  AppConfig({this.apiBaseUrl});

  String getLoginEndpoint() {
    return this.apiBaseUrl + loginPath;
  }

  static Future<AppConfig> forEnvironment(String env) async {
    // set default to dev if nothing was passed
    env = env ?? 'dev';

    // load the json file
    final contents = await rootBundle.loadString(
      'assets/config/$env.json',
    );

    // decode our json
    final json = jsonDecode(contents);

    // convert our JSON into an instance of our AppConfig class
    return AppConfig(apiBaseUrl: json['apiBaseUrl']);
  }
}
