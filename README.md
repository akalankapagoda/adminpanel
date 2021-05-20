
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

### Dependencies

 - express  
    A web framework which handles network and helps expose CRUD operations.
    
-   nodemon  
    Helps auto refresh the server when developing. Installed only on development mode.  
    
-   pg  
    NodeJS PostgreSQL client library  
    
-   jsonwebtoken  
    A library to handle secrets. This will allow hasing the passwords and allow creating and reading JWT to support endpoint security.  

- dotenv
   A library to manage environment specific configurations outside of the code
    
-   Mocha
    A test framework for unit testing.


### ​Further Improvements

1.  Input validations and sanitizing  
      
    The input values are not currently properly validated and needs improvements. Also, since this is dealing with databases, it is vital to sanitize the inputs to avoid attacks like SQL injection.  
    
2.  Response Error Handling  
    At the moment, if any invalid parameter is provided to the input a generic error or an empty response will be received. Instead a meaning message should be returned in each cases with a valid status code depending on whether it’s an error in the request or whether it’s error in the server.  
      
    If it’s an error in the request usually a 4XX status code will be returned.  
    If it’s a server error, a 5XX status code will be returned.  
    
3.  Introducing a password policy for users and change password / forgot password functionality.  
      
    So that the passwords they use are not easily guessable and not prone to brute force attacks.  
    
4.  Introducing an object relational model.  
      
    Nodejs has a nice object relational model library for MongoDB namedMongoose. We need to introduce a similar layer here to convert DB layer elements to objects. They can also be used in the service layer.  
    
5.  Supporting different types of questions and improve question schema model.  
      
    Currently only multiple choice questions are supported. Instead, should associate a question type with each question to determine different behaviour depending on the types of questions. Along with this, the questions should be mapped into a proper schema model.  
    
6.  Modify populating initial data to be done using a file import.  
      
    The initial data is included in an sql script. Instead, it should facilitate to import the initial configurations for the system using an external entity such as a CSV or an admin panel option.  
    
7.  Improve unit tests.  
      
    Currently only some of the functionality is covered by unit tests. Need to cover everything.  
    Also, currently on some cases, if the unit test fails in the middle due to an error, it will leave behind some test data in the database. Instead, should use ‘setUp’ and ‘cleanUp’ methods approach to clear out test data even in an error scenarios before completing the unit tests.

## MobileUI

A Sample Mobile UI is available which is built using Flutter to connect to the server and manage admin functions.

The UI uses [Block State Management Library](https://bloclibrary.dev/#/) to manage UI states.

## ​Prerequisites

1.  You need to have [Flutter](https://flutter.dev/docs/get-started/install) installed.
    
2.  You need to have [AndroidStudio](https://developer.android.com/studio) installed with Flutter plugin support.

## ​How-to Run

1.  Clone [this](https://github.com/akalankapagoda/adminpanel) github repository if it’s not already cloned.
    
2.  Open AndroidStudio and open the ‘mobileui’ folder as a Flutter application.
    
3.  Open ‘assets/config/dev.json’ file and update the IP with the IP/Hostname of the server.  
    {  
    "apiBaseUrl": "<IP/Hostname>:<Port>"  
    }

4.  Start an Android emulator.
    
5.  Run the application as an Android project in the Android emulator.
    
### Mobile UI Functions

The Mobile UI facilitates following functionality at the moment.

 - Login
 - List Users
 - Filter Users by Name
 - View a User
 - Edit a User
 - Add a User
 - Delete a User
	
A screencast is available [here](https://github.com/akalankapagoda/adminpanel/blob/master/screenshots/Android%20Emulator%20-%20New_Device_API_30_5554%202021-05-19%2020-47-40.mp4?raw=true)

![Login](https://github.com/akalankapagoda/adminpanel/blob/master/screenshots/Android%20Emulator%20-%20New_Device_API_30_5554%2019_05_2021%2020_39_34.png?raw=true)
  ![Home](https://github.com/akalankapagoda/adminpanel/blob/master/screenshots/Android%20Emulator%20-%20New_Device_API_30_5554%2019_05_2021%2020_50_44.png?raw=true)
  ![List Users](https://github.com/akalankapagoda/adminpanel/blob/master/screenshots/Android%20Emulator%20-%20New_Device_API_30_5554%2019_05_2021%2020_50_54.png?raw=true)
![Filter Users](https://github.com/akalankapagoda/adminpanel/blob/master/screenshots/Android%20Emulator%20-%20New_Device_API_30_5554%2019_05_2021%2020_51_02.png?raw=true)
![Edit User](https://github.com/akalankapagoda/adminpanel/blob/master/screenshots/Android%20Emulator%20-%20New_Device_API_30_5554%2019_05_2021%2020_51_17.png?raw=true)
![Add User](https://github.com/akalankapagoda/adminpanel/blob/master/screenshots/Android%20Emulator%20-%20New_Device_API_30_5554%2019_05_2021%2020_51_45.png?raw=true)

### Dependencies

 - bloc
   A library to manage app states and ensure a unidirectional event flow.
   
 - http
    A library to do HTTP communication in Flutter
 - 


### ​Further Improvements

1.  The server is hosted locally and the mobile client connects to the server using ‘http’ protocol which is not secure. Should modify the client to change the protocol depending on the dev/prod environment variable.
2. Currently only User related functionality is supported. Need to support managing all other entities.
3. The User privileges are not considered at the moment and any user can edit any entity. Instead, this should be governed by user privileges.
