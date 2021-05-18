
import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobileui/auth/token_repository.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/login/logout_button.dart';
import 'package:mobileui/users/user_bloc.dart';
import 'package:mobileui/users/user_event.dart';
import 'package:mobileui/users/user_repository.dart';
import 'package:mobileui/users/user_state.dart';

class UsersPage extends StatelessWidget {
  final AppConfig config;
  final TokenRepository tokenRepository;
  final UserRepository userRepository;
  final UserBloc userBloc;

  final searchController = TextEditingController();

  UsersPage(
      {@required this.config,
      @required this.tokenRepository,
      @required this.userRepository,
      @required this.userBloc});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserBloc, UserState>(
      bloc: userBloc,
      builder: (
        BuildContext context,
        UserState state,
      ) {
        // ignore: missing_return
        if (state is UserInitial) {
          userBloc.add(new LoadUserListPressed(filter: null));

          return Scaffold(
            appBar: AppBar(title: Text('Users'), actions: <Widget>[
              LogoutButton(),
            ]),
            body: Container(
                padding: EdgeInsets.all(10),
                child: CircularProgressIndicator()),
          );
        } else if (state is UserListLoading) {
          return Scaffold(
            appBar: AppBar(title: Text('Users'), actions: <Widget>[
              LogoutButton(),
            ]),
            body: Container(
                padding: EdgeInsets.all(10),
                child: CircularProgressIndicator()),
          );
        } else if (state is UserList) {
          var titles = [for (var user in state.users) user.name];
          var subtitles = [for (var user in state.users) user.email];

          return Scaffold(
              appBar: AppBar(title: Text('Users'), actions: <Widget>[
                LogoutButton(),
              ]),
              body: Center(
                child: Column(
                  children: [
                      Container(
                          margin:
                              const EdgeInsets.only(top: 20.0, bottom: 20.0),
                          decoration: BoxDecoration(
                              border: Border.all(
                                color: Colors.teal,
                              ),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(20))),
                          width: MediaQuery. of(context). size. width / 10 * 9,
                          child: Row(
                            children: [
                              Container(
                                margin:
                                const EdgeInsets.only(left: 20.0, right: 20.0),
                                width: MediaQuery. of(context). size. width / 10 * 6,
                                child: TextFormField(
                                  decoration: InputDecoration(labelText: 'search'),
                                  controller: searchController,
                                ),
                              ),
                              ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                    shape: CircleBorder(),
                                    primary: Colors.teal
                                ),
                                child: Container(
                                  // width: 200,
                                  // height: 200,
                                  // alignment: Alignment.center,
                                  decoration: BoxDecoration(shape: BoxShape.circle),
                                  child: Icon(Icons.search),
                                ),
                                onPressed: () => {
                                  userBloc.add(LoadUserListPressed(filter: searchController.text))
                                },
                              ),
                              // Container(
                              //     child: Icon(Icons.search)
                              // ),
                            ],
                          )
                      ),
                    Container(
                        height: 200,
                        padding: EdgeInsets.all(10),
                        child: ListView.separated(
                            separatorBuilder:
                                (BuildContext context, int index) =>
                                    const Divider(),
                            itemCount: titles.length,
                            itemBuilder: (context, index) {
                              return Card(
                                  child: ListTile(
                                      title: Text(titles[index]),
                                      subtitle: Text(subtitles[index]),
                                      leading: Icon(Icons.account_circle)));
                              // trailing: Icon(Icons.account_circle)));
                            })),
                  ],
                ),
              ));
        } else {
          return Text("Error");
        }
      },
    );
  }

}
