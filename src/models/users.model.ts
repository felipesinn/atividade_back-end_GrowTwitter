const { v4: uuidv4 } = require('uuid');

const randomUUID = uuidv4();

export class users {
    private _id: string;
    constructor(
      private _name: string,
      private _username: string,
      private _email: string,
      private _password: string,
    ) {
      this._id = randomUUID();
    }
  
    get id(): string {
      return this._id;
    }
  
    get name(): string {
      return this._name;
    }
  
    get username(): string {
      return this._username;
    }
  
    get email(): string {
      return this._email;
    }
  
    get password(): string {
      return this._password;
    }
  }
  