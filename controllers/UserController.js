import { UserModel } from "../models/user";

export default class UserController extends UserModel {
  constructor(id) {
    super({
      id,
    });
  }

  createUser(name) {
    this.name = name;
    this.save(function (err, user) {
      if (err) return console.error(err);
      console.log(user);
    });
  }
  findUser(id) {
    const checkUser = this.findOne({ _id: id });
    if (checkUser === id) {
      return undefined;
    } else {
    }
  }
}
