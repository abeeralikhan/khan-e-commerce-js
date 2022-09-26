const fs = require("fs");

class UserRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    // read, parse & return the data
    return JSON.parse(await fs.promises.readFile(this.filename));
  }

  // attrs is an object
  async create(attrs) {
    // get all the records
    const records = await this.getAll();

    records.push(attrs);
    await this.writeAll(records);
  }

  async writeAll(records) {
    // converting the js object into a string before writing it to the storage
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
}

const test = async () => {
  const repo = new UserRepository("users.json");

  await repo.create({ email: "test@test.com", password: "test123" });

  const users = await repo.getAll();

  console.log(users);
};

test();
