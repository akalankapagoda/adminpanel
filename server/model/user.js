
class User {

    constructor (id, username, name, email) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;

        // We deliberately skip setting salt and hash using the constructor for security perposes
    };

    id;

    username;

    name;

    email;

    salt;

    hash;
};

export default User;