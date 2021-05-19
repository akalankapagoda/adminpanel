
# Admin Panel

A sample admin panel application with server and a mobile ui client.

## Entity Model

The model consists of the following entities with simple connections between each other.
![Admin Panel Entity Model](https://github.com/akalankapagoda/adminpanel/blob/master/AdminPanelEntityModel.png?raw=true)

The entities are converted into JSON objects as follows for carrying them between the server and client.

### User

    {
		"id": ,
		"username": "",
		"name": "",
		"email": "",
		"salt": "",
	}

### Course
    {
        "id": ,
        "name": "",
        "description": "",
        "credits": ,
        "created_by": ,
        "questions": {} // JSON structure undefined
    }

### Role
    {
        "id": ,
        "name": "",
        "description": ""
    }

### Privilege
    {
        "id": ,
        "name": "",
        "description": ""
    }

### Role_Privilege
    {
        "role_id": ,
        "privilege_id": 
    }

### User_Role
	{
	    "user_id": ,
	    "role_id": 
	}

## Server

The Server is build using NodeJs.

### Prerequisites
1. You need to have [Node](https://nodejs.org/) installed.
2. Need to have a [PostgreSQL](https://www.postgresql.org/) server running and accessible from the machine which runs the server application.

### How-to Run
1. Clone this git project if it’s not already cloned.
2. Navigate to the ‘server’ folder using command prompt or terminal.
3. Execute the following command to run the module.

    npm run dev
    
4. Verify that the server is successfully started by navigating to the following URL using the browser.

    http://localhost:3000/health

  It should return `Server is healthy and running`

### API Reference

The API is protected by credentials and either of Basic Auth or a JWT can be used to authorise a request.

In case a JWT is required, a request should be sent to the login endpoint first to obtain a JWT.


*** A comprehensive sample Postman request collection is available [here](https://github.com/akalankapagoda/adminpanel/blob/master/Server.postman_collection.json)



#### Login Endpoint

**Request**

    POST /login
    Headers : Authorization "Basic {digest}"

**Response**
A JWT Token

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwibmFtZSI6IkFrYWxhbmthIFBhZ29kYSBBcmFjaGNoaSIsImlhdCI6MTYyMTQ1MDgzNCwiZXhwIjoxNjIxNDUyNjM0fQ.UB82_GSBRW7Rr0clOWgiTcokZBZfDYaz_pFiH7KH2PU

#### User Endpoints

| Action |HTTP Method | Endpoint | Query Parameters | Request Body| Response |
|--|--|--|--|--|--|
| List Users| GET| /user/list | filter | | List of Users |
| Get User| GET| /user | id| | User Object |
| Create User| POST| /user | | User Object | HTTP SC 200 |
| Update User| PUT| /user | | User Object | HTTP SC 200 |
| Delete User| DELETE| /user | | id | HTTP SC 200 |

#### Courses Endpoints

| Action |HTTP Method | Endpoint | Query Parameters | Request Body| Response |
|--|--|--|--|--|--|
| List Courses| GET| /course/list | filter | | List of Courses|
| Get Course| GET| /course| id| | Course Object |
| Create Course| POST| /course| | Course Object | HTTP SC 200 |
| Update Course| PUT| /course| | Course Object | HTTP SC 200 |
| Delete Course| DELETE| /course| | id | HTTP SC 200 |

#### Roles Endpoints

| Action |HTTP Method | Endpoint | Query Parameters | Request Body| Response |
|--|--|--|--|--|--|
| List Roles| GET| /role/list | filter | | List of Role|
| Get Role| GET| /role| id| | Course Role|
| Create Role| POST| /role| | Course Role| HTTP SC 200 |
| Update Role| PUT| /role| | Course Role| HTTP SC 200 |
| Delete Role| DELETE| /role| | id | HTTP SC 200 |

#### Privileges Endpoints

| Action |HTTP Method | Endpoint | Query Parameters | Request Body| Response |
|--|--|--|--|--|--|
| List Privileges| GET| /privilege/list | filter | | List of Privilege|
| Get Privilege| GET| /privilege| id| | Course Privilege|
| Create Privilege| POST| /privilege| | Course Privilege| HTTP SC 200 |
| Update Privilege| PUT| /privilege| | Course Privilege| HTTP SC 200 |
| Delete Privilege| DELETE| /privilege| | id | HTTP SC 200 |

#### Role Privileges Endpoints

| Action |HTTP Method | Endpoint | Query Parameters | Request Body| Response |
|--|--|--|--|--|--|
| List RolePrivileges| GET| /rolePrivileges/list | filter | | List of RolePrivilege|
| Create RolePrivilege| POST| /rolePrivileges| | Course RolePrivilege| HTTP SC 200 |
| Delete RolePrivilege| DELETE| /rolePrivileges| | id | HTTP SC 200 |

#### User Roles Endpoints

| Action |HTTP Method | Endpoint | Query Parameters | Request Body| Response |
|--|--|--|--|--|--|
| List UserRoles| GET| /userRoles/list | filter | | List of UserRole|
| Create UserRole| POST| /userRoles| | Course UserRole| HTTP SC 200 |
| Delete UserRole| DELETE| /userRoles| | id | HTTP SC 200 |
