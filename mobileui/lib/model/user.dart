/// User entity
class User {
  final int id;
  String username;
  String name;
  String email;
  String password;

  User({
    this.id,
    this.username,
    this.name,
    this.email,
  });

  /// Convert a json to a User object
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      username: json['username'],
      email: json['email'],
    );
  }

  /// Convert a user object to a JSON
  Map<String, dynamic> toJson() {
    return <String, dynamic>{
      'id': id.toString(),
      'username': username,
      'name': name,
      'email': email,
      'password': password
    }..removeWhere(
        (dynamic key, dynamic value) => key == null || value == null);
  }
}
