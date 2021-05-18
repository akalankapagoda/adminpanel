import 'package:flutter/material.dart';

import 'package:bloc/bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobileui/config/app_config.dart';
import 'package:mobileui/users/user_list/user_list_bloc.dart';
import 'package:mobileui/users/user_repository.dart';
import 'auth/token_repository.dart';

import 'auth/authentication_bloc.dart';
import 'auth/authentication_event.dart';
import 'auth/authentication_state.dart';

import 'home/splash_page.dart';

import 'login/login_page.dart';
import 'home/home.dart';
import 'home/loading.dart';

class MyBlocObserver extends BlocObserver {
  @override
  void onCreate(BlocBase bloc) {
    super.onCreate(bloc);
    print('onCreate -- ${bloc.runtimeType}');
  }

  @override
  void onChange(BlocBase bloc, Change change) {
    super.onChange(bloc, change);
    print('onChange -- ${bloc.runtimeType}, $change');
  }

  @override
  void onError(BlocBase bloc, Object error, StackTrace stackTrace) {
    print('onError -- ${bloc.runtimeType}, $error');
    super.onError(bloc, error, stackTrace);
  }

  @override
  void onClose(BlocBase bloc) {
    super.onClose(bloc);
    print('onClose -- ${bloc.runtimeType}');
  }
}

void main() async  {
  Bloc.observer = MyBlocObserver();

  WidgetsFlutterBinding.ensureInitialized();
  final config = await AppConfig.forEnvironment('dev'); // TODO: Get the environment from an argument

  runApp(App(tokenRepository: TokenRepository(config: config), config: config));
}

class App extends StatefulWidget {
  final TokenRepository tokenRepository;
  final AppConfig config;

  App({Key key, @required this.tokenRepository, @required this.config}) : super(key: key);

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  AuthenticationBloc authenticationBloc;
  TokenRepository get tokenRepository => widget.tokenRepository;
  UserRepository userRepository;
  UserListBloc userListBloc;

  @override
  void initState() {
    authenticationBloc = AuthenticationBloc(tokenRepository: tokenRepository);
    authenticationBloc.add(AppStarted());
    userRepository = new UserRepository(config: widget.config, tokenRepository: tokenRepository);
    userListBloc = new UserListBloc(tokenRepository: tokenRepository, userRepository: userRepository, config: widget.config, context: context);
    super.initState();
  }

  @override
  void dispose() {
    authenticationBloc.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    return MultiBlocProvider(
      providers: [
        BlocProvider<AuthenticationBloc>(create: (_) => authenticationBloc),
        BlocProvider<UserListBloc>(create: (_) => userListBloc)
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        home: BlocBuilder<AuthenticationBloc, AuthenticationState>(
          bloc: authenticationBloc,
          builder: (BuildContext context, AuthenticationState state) {

            authenticationBloc.context = context; // Set context to help with navigation

            if (state is AuthenticationUninitialized) {
              return SplashPage();
            }
            if (state is AuthenticationAuthenticated) {
              return HomePage(config: widget.config, tokenRepository: widget.tokenRepository, userRepository: userRepository,);
            }
            if (state is AuthenticationUnauthenticated) {
              return LoginPage(tokenRepository: tokenRepository);
            }
            if (state is AuthenticationLoading) {
              return LoadingIndicator();
            }

            return LoadingIndicator(); // Shouldn't come here
          },
        ),
      ),
    );
  }
}
