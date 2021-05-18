
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

  UserEditPage({@required this.userBloc, @required this.userListBloc, this.user}) {

    this.nameController = TextEditingController();
    this.usernameController = TextEditingController();
    this.emailController = TextEditingController();
    this.passwordController = TextEditingController();

    if (user == null) {
      this.newUser = true;
      this.title = 'New User';
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
        if (state is UserSaveInProgress) {
          return LoadingScreen('User');

        }
        else if (state is UserSaveCompleted) {

          UserSaveCompleted completedEvent = state as UserSaveCompleted;

          return getSaveSuccessScreen(context, completedEvent.user.name);

        } else if (state is UserInitial) {

          return getUserDetailsScreen(context);

        } else {
          return Text("Error"); // Unlikely
        }
      },
    );

  }

Widget getSaveSuccessScreen(BuildContext context, String name) {
  return Scaffold(
    appBar: AppBar(title: Text(this.title), actions: <Widget>[
      LogoutButton(),
    ]),
    body: Container(
        padding: EdgeInsets.all(10),
        child: Center(
            child: Column(
              children: [
                Spacer(flex: 10,),
                Container(
                  child: Text("User " + name + " saved",
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
                Spacer(flex: 10,)
              ],
            )
        )
    ),
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
                Row(
                  children: [
                    Container(width: 100,
                        height: 20,
                        margin:
                        const EdgeInsets.only(left: 20.0, right: 20.0),
                        child: Text('Name')),
                    Container(
                      width: 200,
                      height: 40,
                      margin:
                      const EdgeInsets.only(top: 20.0, bottom: 20.0),
                      decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.teal,
                          ),
                          borderRadius:
                          BorderRadius.all(Radius.circular(20))),
                      child: Container(
                          margin:
                          const EdgeInsets.only(left: 20.0, right: 20.0),
                          child: TextFormField(controller: nameController)),
                    )
                  ],
                ),
                Row(
                  children: [
                    Container(width: 100,
                        height: 20,
                        margin:
                        const EdgeInsets.only(left: 20.0, right: 20.0),
                        child: Text('Username')),
                    Container(
                      width: 200,
                      height: 40,
                      margin:
                      const EdgeInsets.only(top: 20.0, bottom: 20.0),
                      decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.teal,
                          ),
                          borderRadius:
                          BorderRadius.all(Radius.circular(20))),
                      child: Container(
                          margin:
                          const EdgeInsets.only(left: 20.0, right: 20.0),
                          child: TextFormField(controller: usernameController)),
                    )
                  ],
                ),
                Row(
                  children: [
                    Container(width: 100,
                        height: 20,
                        margin:
                        const EdgeInsets.only(left: 20.0, right: 20.0),
                        child: Text('Email')),
                    Container(
                      width: 200,
                      height: 40,
                      margin:
                      const EdgeInsets.only(top: 20.0, bottom: 20.0),
                      decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.teal,
                          ),
                          borderRadius:
                          BorderRadius.all(Radius.circular(20))),
                      child: Container(
                          margin:
                          const EdgeInsets.only(left: 20.0, right: 20.0),
                          child: TextFormField(controller: emailController)),
                    )
                  ],
                ),
                newUser ?
                Row(
                  children: [
                    Container(width: 100,
                        height: 20,
                        margin:
                        const EdgeInsets.only(left: 20.0, right: 20.0),
                        child: Text('Password')),
                    Container(
                      width: 200,
                      height: 40,
                      margin:
                      const EdgeInsets.only(top: 20.0, bottom: 20.0),
                      decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.teal,
                          ),
                          borderRadius:
                          BorderRadius.all(Radius.circular(20))),
                      child: Container(
                          margin:
                          const EdgeInsets.only(left: 20.0, right: 20.0),
                          child: TextFormField(controller: passwordController)),
                    )
                  ],
                ) : Container(),
                ElevatedButton(
                  onPressed:() {
                    if (newUser) {
                      userBloc.add(SaveUserPressed(user: user));
                    } else {
                      userBloc.add(UpdateUserPressed(context: context, user: user));
                    }
                  },
                  child: Text('Save'),
                )
              ],
            ),
          ),
        )
    );
  }

}