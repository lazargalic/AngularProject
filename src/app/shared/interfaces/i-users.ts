export interface IUsers {
    id : number,
    role: {
        roleId: number,
        nameRole : string
    },
    firstName: string,
    lastName: string,
    email :string,
    isActive: boolean,
    identityNumber : string, 
    phoneNumber: string,
    createdAt: boolean,
    lastUpdatedAt : string, 
    deletedAt: string,
}



/*
    "id": 1,
    "role": {
      "roleId": 2,
      "nameRole": "Administrator"
    },
    "firstName": "Lazar",
    "lastName": "Galic",
    "email": "galic.lazar@gmail.com",
    "isActive": true,
    "identityNumber": "123213123211",
    "phoneNumber": "123213123213",
    "createdAt": "2023-06-27T01:13:20.0311367",
    "lastUpdatedAt": "1/1/0001 12:00:00 AM",
    "deletedAt": "/",
    "userUseCases": [
*/