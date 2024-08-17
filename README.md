# Software-Co
###  To install and run the project
```
npm install 
npm run dev
```
Live Demo BaseUrl - [Link](https://software-co.onrender.com)

_it is uploaded on render that takes a minute of restart time after some time of inactivity_
> I have used express-validator to validate user input
### APIs

##### Signup API
- method: POST
- route: /api/users/signup
- body: firstName, lastName, email, password, role

##### Login API
- method: POST
- route: /api/users/login
- body: email, password

_desc: it will create jwt token which will directly update token in variable "token" whenever api request will send in "postman" as i have written script_

##### Get Users
- method: GET
- route: /api/users?search=keyword

##### Update Multiple Users
- method: PUT
- route: /api/users/update-many
- body: filter(any condition eg.lastName:"patel"),updateData

_desc: batch updates on multiple users at once with the same data._

##### Bulk Update Users
- method: PUT
- route: /api/users/bulk-update
- body: updates(array)

##### eg.
```
{
  "updates": [{
                "userId": "66c076d3abe7917039023c2c",
                "data": {
                "firstName": "jinal N",
                "lastName": "Patel"
                }
            },
            {
                "userId": "66c06864ee90e1a050003cfc",
                "data": {
                "lastName": "Patel"
                 }
            }]
    }
```
 _desc: updates multiple users data._

##### Check Access Module
- method: POST
- route: /api/users/check-access
- body: userId, moduleName

_desc: it will return boolean weather it has access or not_

##### Create Role
- method: POST
- route: /api/roles
- body: roleName,accessModules

_desc: to create a role_

##### List All Roles
- method: get
- route: /api/roles?search=keyword

##### Update Access Module
- method: PATCH
- route: /api/roles/update-access/:roleId
- body: newModule(pass modules in array)

_desc: Update access modules for a role_

##### Remove Access Module
- method: POST
- route: /api/roles/remove-access/:roleId
- body: moduleToRemove(pass module name in string)

_desc: remove specified access module from a role_
