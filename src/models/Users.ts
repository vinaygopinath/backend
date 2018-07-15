export class Users {
  private _username: string;
  private _email: string;
  private _password: string;

  public get username(): string {
    return this._username;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }
}
