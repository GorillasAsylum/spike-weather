import { UserModel } from "../models/user";

export default class UserController {
  createUser(id, name) {
    const model = new UserModel({
      id: id,
      name: name,
    });
    model.find({}, function (err, docs) {
      if (err) return console.log(err);
      console.log(docs);
    });
    console.log(model);
  }
}
