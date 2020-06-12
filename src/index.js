const fs = require('fs');
let data = {};
const PandaDBError = require('./error.js');

/**
 * A very simple, json based database
 */
class PandaDB {

  /**
   * Creates a new pandaDB
   * @param {object} [options = {}] Options for this pandaDB.
   * @param {string} [options.name = PandaDB] The name of the pandaDB and the stored json file.
   * @param {string} [options.dir = ./pandaDB] Directory path where the json file will be stored.
   * @param {boolean} [options.autoSave = true] Whether to automatically update the json file when changes were made.
   * 
   * @example
   * const PandaDB = require('panda-db');
   * 
   * const DB = new PandaDB({
   *  name: "testing",
   *  dir: "./database"
   * });
   */

  constructor(options = {}) {
    options.name = String(options.name || 'PandaDB');
    options.dir = options.dir ? String(options.dir) : './database';
    options.autoSave = options.autoSave === undefined ? true : options.autoSave;

    if (!fs.existsSync(options.dir)) fs.mkdirSync(options.dir);

    Object.defineProperties(this, {
      options: {
        value: options
      },
      version: {
        value: require('../package.json').version
      }
    });

    try {
      data = require(`${process.cwd()}/${options.dir}/${options.name}.json`);
    } catch {
      this.save();
    }
  }


  /**
   * Updates the json file. This function doesn't need to be called if the `autoSave` option is true.
   * @returns {boolean} Whether the save was successful.
   */
  save() {
    try {
      fs.writeFileSync(`${process.cwd()}/${this.options.dir}/${this.options.name}.json`, JSON.stringify(data, null, 2));
      data = require(`${process.cwd()}/${this.options.dir}/${this.options.name}.json`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Changes the value of the specified element
   * @param {string} key The key to add/change in the pandaDB
   * @param {*} value (new) value of the key
   * @param {string} [path] The path to modify inside `key` if its value is an object
   * @returns {PandaDB}
   * @example
   * pandaDB.set('rating', 'pandaDB is easy to use!');
   * 
   * pandaDB.set("anObject", {});
   * 
   * pandaDB.set("anObject", "A value", "objectPath");
   */
  set(key, value, path) {
    if (key == undefined || value == undefined) throw new PandaDBError("key or value missing");
    key = String(key);
    path = path ? String(path) : undefined;
    if (path) {
      path = String(path);
      if (!data[key]) PandaDBError(`The key "${key}" does not exist in the PandaDB: ${this.options.name}`);
      data[key][path] = value;
    } else data[key] = value;

    if (this.options.autoSave) this.save();
    return this;
  }

  /**
   * Gets a key from the pandaDB.
   * @param {string} key The key to get from the pandaDB.
   * @param {string} [path] Can be used if `key` is an object.
   * @returns {*} Obtained value of `key` or undefined if it doesn't exist.
   */
  get(key, path) {
    if (key == undefined) throw new PandaDBError("Key missing");
    key = String(key);
    if (path) {
      path = String(path);
      if (data[key]) return data[key][path];
      throw new PandaDBError(`The key "${key}" does not exist in the PandaDB: ${this.options.name}`);
    }
    else return data[key];
  }


  /**
   * Checks if a key exists in the pandaDB.
   * @param {string} key The key to check.
   * @param {string} [path] Can be used if `key` is an object.
   * @return {boolean} Whether the key exists.
   */
  has(key, path) {
    if (key == undefined) throw new PandaDBError("key missing");
    key = String(key);
    if (path) {
      path = String(path);
      if (data[key])
        return data[key][path] != undefined;
      throw new PandaDBError(`The key "${key}" does not exist in the PandaDB: ${this.options.name}`);
    }
    else return data[key] != undefined;
  }

  /**
   * Ensures that `key` exists.
   * @param {string} key The key to ensure in the pandaDB.
   * @param {*} defaultValue The value to be assigned to `key` is it doesn't exists in the pandaDB.
   * @returns {*} `key`'s value.
   */
  ensure(key, defaultValue) {
    if (key == undefined || defaultValue == undefined) throw new PandaDBError("key or value missing");
    key = String(key);
    if (data[key] == undefined) {
      data[key] = defaultValue;
      if (this.options.autoSave) this.save();
    }
    return data[key];
  }

  /**
   * Deletes a key.
   * @param {string} key The key to delete from the pandaDB.
   * @param {*} [path]
   * @returns {boolean} Whether the delete was successful.
   */
  delete(key, path) {
    if (!key) throw new PandaDBError("key missing");
    key = String(key);
    path = path ? String(path) : null;
    if (data[key]) {
      const deleted = delete data[key];
      if (this.options.autoSave) this.save();
      return deleted;
    }
    else return false;
  }

  /**
   * Obtains all keys from the pandaDB.
   * @returns {array<string>} Array of indexes in the pandaDB.
   */
  get keys() {
    return Object.keys(data);
  }

  /**
   * Amount of keys stored in the pandaDB.
   * @returns {number} The size of the pandaDB.
   */
  get size() {
    return this.keys.length;
  }
}

module.exports = PandaDB;
