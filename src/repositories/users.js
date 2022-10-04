const util = require("util");
const crypto = require("crypto");

const Repository = require("./repository");

// crypto does not provide a promise based version of scrypt() function
const scrypt = util.promisify(crypto.scrypt);

class UserRepository extends Repository {
  async create(attrs) {
    // adding a random id to the object
    attrs.id = this.randomId();

    // get all the records
    const records = await this.getAll();
    const salt = crypto.randomBytes(8).toString("hex");

    // buffer of hash = password + salt;
    const buf = await scrypt(attrs.password, salt, 64);

    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    // Saved --> password saved in our database. 'hashed.salt'
    // Supplied --> password given to us by a user trying to sign in

    const [hashed, salt] = saved.split(".");
    const buf = await scrypt(supplied, salt, 64);
    const hashedSupplied = buf.toString("hex");

    return hashed === hashedSupplied;
  }
}

module.exports = new UserRepository("users.json");
