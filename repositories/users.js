const { NONAME } = require("dns");
const fs = require("fs");
const uuid = require("uuid");

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

    // adding a random id to the object
    records.push({ ...attrs, id: this.randomId() });
    await this.writeAll(records);
  }

  async writeAll(records) {
    // converting the js object into a string before writing it to the storage
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return uuid.v4();
  }

  async getOne(id) {
    const records = await this.getAll();

    return records.find((record) => record.id === id);
  }
}

const test = async () => {
  const repo = new UserRepository("users.json");

  const user = await repo.getOne("4e51863a-c768-4ac9-9165-f57934325fce");

  console.log(user);
};

test();
