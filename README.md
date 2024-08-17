## run project

<!-- npm install -->
<!-- npm run dev -->
<!-- I have used express-validator to validate user input -->

## APIs

<!-- api: Signup API
method: POST
route: /api/users/signup
body: firstName, lastName, email, password, role

api: Login API
method: POST
route: /api/users/login
body: email, password
desc: it will create jwt token which will directly update token in variable "token" whenever api request will send in "postman" as i have written script

api: Get Users API
method: GET
route: /api/users?search=keyword

api: Update multiple users
method: PUT
route: /api/users/update-many
body: filter(any condition eg.lastName:"patel"),updateData
desc: batch updates on multiple users at once with the same data.

api: bulk update users
method: PUT
route: /api/users/bulk-update
body: updates(array)

- eg. {
  "updates": [
  {
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
  }
  ]
  }
  desc: updates multiple users data.

api: Check Access Module
method: POST
route: /api/users/check-access
body: userId, moduleName
desc: it will return boolean weather it has access or not

api: Create Role
method: POST
route: /api/roles
body: roleName,accessModules
desc: to create a role

api: list all roles
method: get
route: /api/roles?search=keyword

api: Update access module
method: PATCH
route: /api/roles/update-access/:roleId
body: newModule(pass modules in array)
desc: Update access modules for a role

api: Remove access module
method: POST
route: /api/roles/remove-access/:roleId
body: moduleToRemove(pass module name in string)
desc: remove specified access module from a role -->
