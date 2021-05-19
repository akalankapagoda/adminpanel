import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobileui/login/logout_button.dart';
import 'package:mobileui/model/user.dart';
import 'package:mobileui/ui_model/loading_screen.dart';
import 'package:mobileui/users/user_bloc.dart';
import 'package:mobileui/users/user_event.dart';
import 'package:mobileui/users/user_list/user_list_bloc.dart';
import 'package:mobileui/users/user_list/user_list_event.dart';
import 'package:mobileui/users/user_state.dart';

/// Shows an indivitual user detail to add/update or delete the user
class UserEditPage extends StatelessWidget {
  User user;

  bool newUser;

  String title;

  final UserBloc userBloc;
  final UserListBloc userListBloc;

  TextEditingController nameController;
  TextEditingController usernameController;
  TextEditingController emailController;
  TextEditingController passwordController;

  UserEditPage(
      {@required this.userBloc, @required this.userListBloc, this.user}) {
    this.nameController = TextEditingController();
    this.usernameController = TextEditingController();
    this.emailController = TextEditingController();
    this.passwordController = TextEditingController();

    if (user == null) {
      this.newUser = true;
      this.title = 'New User';
      this.user = new User();
    } else {
      this.newUser = false;
      this.title = user.name;

      nameController.text = user.name;
      usernameController.text = user.username;
      emailController.text = user.email;
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserBloc, UserState>(
      bloc: userBloc,
      builder: (
        BuildContext context,
        UserState state,
      ) {
        // ignore: missing_return
        if (state is UserOperationInProgress) {
          return LoadingScreen('User');
        } else if (state is UserSaveCompleted) {
          UserSaveCompleted completedEvent = state as UserSaveCompleted;

          return getOperationSuccessScreen(
              context, "User '" + completedEvent.user.name + "' saved!");
        } else if (state is UserDeleteCompleted) {
          UserDeleteCompleted completedEvent = state as UserDeleteCompleted;

          return getOperationSuccessScreen(
              context, "User '" + completedEvent.user.name + "' deleted!");
        } else if (state is UserInitial) {
          return getUserDetailsScreen(context);
        } else {
          return Text("Error"); // Unlikely
        }
      },
    );
  }

  Widget getOperationSuccessScreen(BuildContext context, String message) {
    return Scaffold(
      appBar: AppBar(title: Text(this.title), actions: <Widget>[
        LogoutButton(),
      ]),
      body: Container(
          padding: EdgeInsets.all(10),
          child: Center(
              child: Column(
            children: [
              Spacer(
                flex: 10,
              ),
              Container(
                child: Text(
                  message,
                  style: TextStyle(
                    color: Colors.teal,
                    fontSize: 20,
                  ),
                ),
              ),
              Spacer(),
              ElevatedButton(
                  onPressed: () {
                    userListBloc.add(new UserListInit());

                    Navigator.of(context).pop();
                  },
                  child: Text("OK")),
              Spacer(
                flex: 10,
              )
            ],
          ))),
    );
  }

  Widget getUserDetailsScreen(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text(this.title), actions: <Widget>[
          LogoutButton(),
        ]),
        body: Form(
          child: Center(
            child: Column(
              children: [
                getFormField('Name', nameController),
                getFormField('Username', usernameController),
                getFormField('Email', emailController),
                newUser
                    ? getFormField('Password', passwordController,
                        obscureText: true)
                    : Container(),
                getActionButtons()
              ],
            ),
          ),
        ));
  }

  Widget getFormField(String label, TextEditingController controller,
      {bool obscureText: false}) {
    return Row(
      children: [
        Container(
            width: 100,
            height: 20,
            margin: const EdgeInsets.only(left: 20.0, right: 20.0),
            child: Text(label)),
        Container(
          width: 200,
          height: 40,
          margin: const EdgeInsets.only(top: 20.0, bottom: 20.0),
          decoration: BoxDecoration(
              border: Border.all(
                color: Colors.teal,
              ),
              borderRadius: BorderRadius.all(Radius.circular(20))),
          child: Container(
              margin: const EdgeInsets.only(left: 20.0, right: 20.0),
              child: TextFormField(
                controller: controller,
                obscureText: obscureText,
              )),
        )
      ],
    );
  }

  Widget getActionButtons() {
    if (newUser) {
      return getSaveButton();
    } else {
      return Row(
        children: [
          Spacer(
            flex: 2,
          ),
          getSaveButton(),
          Spacer(),
          getDeleteButton(),
          Spacer(
            flex: 2,
          )
        ],
      );
    }
  }

  Widget getSaveButton() {
    return ElevatedButton(
      onPressed: () {
        setProperties();
        if (newUser) {
          userBloc.add(SaveUserPressed(user: user));
        } else {
          userBloc.add(UpdateUserPressed(user: user));
        }
      },
      child: Text('Save'),
    );
  }

  Widget getDeleteButton() {
    return ElevatedButton(
      onPressed: () {
        setProperties();
        userBloc.add(DeleteUserPressed(user: user));
      },
      child: Text('Delete'),
    );
  }

  void setProperties() {
    user.name = nameController.text;
    user.username = usernameController.text;
    user.email = emailController.text;
    user.password = passwordController.text;
  }
}
