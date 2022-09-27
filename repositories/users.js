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
    attrs.id = this.randomId();

    records.push(attrs);
    await this.writeAll(records);

    return attrs;
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

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id.slice(0, 5)}... not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) return record;
    }
  }
}

module.exports = new UserRepository("users.json");
