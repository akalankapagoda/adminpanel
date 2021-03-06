import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

import 'package:mobileui/auth/authentication_bloc.dart';
import 'login_block.dart';
import 'login_state.dart';
import 'login_event.dart';

class LoginForm extends StatefulWidget {
  final LoginBloc loginBloc;
  final AuthenticationBloc authenticationBloc;

  LoginForm({
    Key key,
    @required this.loginBloc,
    @required this.authenticationBloc,
  }) : super(key: key);

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  LoginBloc get _loginBloc => widget.loginBloc;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      bloc: _loginBloc,
      builder: (
        BuildContext context,
        LoginState state,
      ) {
        if (state is LoginFailure) {
          _onWidgetDidBuild(() {
            Scaffold.of(context).showSnackBar(
              SnackBar(
                content: Text('${state.error}'),
                backgroundColor: Colors.red,
              ),
            );
          });
        }

        return Form(
          child: Column(
            children: [
              Spacer(
                flex: 5,
              ),
              Text("Please login"),
              Spacer(),
              Row(
                children: [
                  Spacer(),
                  Container(
                    width: 300,
                    child: TextFormField(
                      decoration: InputDecoration(labelText: 'username'),
                      controller: _usernameController,
                    ),
                  ),
                  Spacer()
                ],
              ),
              Row(
                children: [
                  Spacer(),
                  Container(
                    width: 300,
                    child: TextFormField(
                      decoration: InputDecoration(labelText: 'password'),
                      controller: _passwordController,
                      obscureText: true,
                    ),
                  ),
                  Spacer()
                ],
              ),
              ElevatedButton(
                onPressed:
                    state is! LoginLoading ? _onLoginButtonPressed : null,
                child: Text('Login'),
              ),
              Container(
                child:
                    state is LoginLoading ? CircularProgressIndicator() : null,
              ),
              Spacer(
                flex: 5,
              ),
            ],
          ),
        );
      },
    );
  }

  void _onWidgetDidBuild(Function callback) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      callback();
    });
  }

  _onLoginButtonPressed() {
    _loginBloc.add(LoginButtonPressed(
      username: _usernameController.text,
      password: _passwordController.text,
    ));
  }
}
