import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/login/logout_button.dart';
import 'package:mobileui/model/user.dart';
import 'package:mobileui/ui_model/loading_screen.dart';
import 'package:mobileui/users/user_bloc.dart';
import 'package:mobileui/users/user_list/user_list_bloc.dart';
import 'package:mobileui/users/user_edit_page.dart';
import 'package:mobileui/users/user_list/user_list_event.dart';
import 'package:mobileui/users/user_repository.dart';
import 'package:mobileui/users/user_list/user_list_state.dart';

/// UI Page for showing list of users
class UsersPage extends StatelessWidget {
  final AppConfig config;
  final TokenRepository tokenRepository;
  final UserRepository userRepository;
  final UserListBloc userListBloc;

  final searchController = TextEditingController();

  UsersPage(
      {@required this.config,
      @required this.tokenRepository,
      @required this.userRepository,
      @required this.userListBloc}) {}

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserListBloc, UserListState>(
      bloc: userListBloc,
      builder: (
        BuildContext context,
        UserListState state,
      ) {
        // ignore: missing_return
        if (state is UserListInitial) {
          userListBloc.add(new LoadUserListPressed(filter: null));

          return LoadingScreen('User');
        } else if (state is UserListLoading) {
          return LoadingScreen('User');
        } else if (state is UserListLoaded) {
          return getUserListScreen(context, state.users);
        } else {
          return Text("Error");
        }
      },
    );
  }

  Widget getUserListScreen(BuildContext context, List<User> users) {
    var names = [for (var user in users) user.name];
    var emails = [for (var user in users) user.email];

    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(title: Text('Users'), actions: <Widget>[
          LogoutButton(),
        ]),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) {
                return new UserEditPage(
                  userBloc: new UserBloc(
                      tokenRepository: tokenRepository,
                      userRepository: userRepository,
                      config: config,
                      context: context),
                  userListBloc: userListBloc,
                );
              }),
            );
          },
          child: const Icon(Icons.add),
          backgroundColor: Colors.green,
        ),
        body: Center(
          child: Column(
            children: [
              Container(
                  margin: const EdgeInsets.only(top: 20.0, bottom: 20.0),
                  decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.teal,
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(20))),
                  width: MediaQuery.of(context).size.width / 10 * 9,
                  child: Row(
                    children: [
                      Container(
                        margin: const EdgeInsets.only(left: 20.0, right: 20.0),
                        width: MediaQuery.of(context).size.width / 10 * 6,
                        child: TextFormField(
                          decoration: InputDecoration(labelText: 'search'),
                          controller: searchController,
                        ),
                      ),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            shape: CircleBorder(), primary: Colors.teal),
                        child: Container(
                          decoration: BoxDecoration(shape: BoxShape.circle),
                          child: Icon(Icons.search),
                        ),
                        onPressed: () => {
                          userListBloc.add(LoadUserListPressed(
                              filter: searchController.text))
                        },
                      ),
                    ],
                  )),
              Container(
                  height: MediaQuery.of(context).size.height / 10 * 6,
                  padding: EdgeInsets.all(10),
                  child: ListView.separated(
                      separatorBuilder: (BuildContext context, int index) =>
                          const Divider(),
                      itemCount: names.length,
                      itemBuilder: (context, index) {
                        return Card(
                            child: ListTile(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) {
                                      return new UserEditPage(
                                          user: users[index],
                                          userBloc: new UserBloc(
                                              tokenRepository: tokenRepository,
                                              userRepository: userRepository,
                                              config: config,
                                              context: context),
                                          userListBloc: userListBloc);
                                    }),
                                  );
                                },
                                title: Text(names[index]),
                                subtitle: Text(emails[index]),
                                leading: Icon(Icons.account_circle)));
                        // trailing: Icon(Icons.account_circle)));
                      })),
            ],
          ),
        ));
  }
}
