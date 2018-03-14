export class User {
  constructor(public email: string,
    public roles: { [key: string]: boolean }) { }
}
