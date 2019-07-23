const fs = require('fs');
let data = {};

class PandaDB {

/**
 * Creates a new pandaDB
 * @param {Object} options Options for this pandaDB, optional.
 * @param {String} options.name The name of the pandaDB and the stored json file.
 * @param {String} options.dir Directory path where the json file will be stored. Defaults to `./pandaDB`.
 * @param {Boolean} options.backup Whether to create a backup file for this pandaDB.
 * @param {Number} options.backupInterval In seconds, delay to update the backup file.
 * 
 * @example
 * const PandaDB = require('panda-db');
 * 
 * const DB = new PandaDB({
 *  name: "testing",
 *  dir: "./database"
 * })
 * 
 * //pandaDB with backups
 * const withBackups = new PandaDB({
 *  name: "backupedDB",
 *  backup: true,
 *  backupInterval: 30 
 * })
 */

  constructor(options = {}) {
    options.name = String(options.name || 'PandaDB');
    options.dir = options.dir ? String(options.dir) : './database';
    options.backup = Boolean(options.backups);
    if(options.backup) {
      options.backupInterval = options.backupInterval || 60;

      setInterval(function () {
        fs.writeFileSync(`${options.dir}/backups/${options.name}.json`, JSON.stringify(data, null, 2))
      }, options.backupInterval * 1000); 

      if(!fs.existsSync(`${options.dir}/backups`)) fs.mkdirSync(`${options.dir}/backups`);
    }


    if(!fs.existsSync(options.dir)) fs.mkdirSync(options.dir);

    Object.defineProperties(this, {
      options: {
        value: options
      },
      version: {
        value: require('./package.json').version
      }
    });
    
    try {
      data = require(`${process.cwd()}/${options.dir}/${options.name}.json`);
    } catch {
      this.save();
    }
  }
   
  
/**
 * pandaDB
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
  * @param {String} key The key to add/change in the pandaDB
  * @param {*} value (new) value of the key
  * @param {String} path Optional, the path to modify inside `key` if its value is: object
  * 
  * @example
  * pandaDB.set("anObject", {});
  * 
  * pandaDB.set("anObject", "value of an element inside the object", "insideObject");
  */ 
  set(key, value, path) {
    if(!key || !value) throw new Error("key or value missing");
    key = String(key);
    path = path ? String(path) : undefined;
    if(path) {
      path = String(path);
     if(!data[key]) data[key] = {};
      data[key][path] = value;
    } else data[key] = value;
    
    this.save();
    return this;
  }
  
  /**
   * Gets a property from the pandaDB.
   * @param {String} prop The property to get from the pandaDB
   * @param {String} path Optional, can be used if `prop` is an object
   */
  get (prop, path) {
    if(!prop) throw new Error("Property missing");
    prop = String(prop);
    if(path) {
      path = String(path);
      if (data[prop]) return data[prop][path];
      throw new Error(`The property ${prop} does not exist in the PandaDB: ${this.options.name}`);
    } 
    else return data[prop];
  }
  
/**
 * Ensures that `prop` exists.
 * @param {*} prop The property to ensure in the pandaDB
 * @param {*} defaultValue The value to be assigned to `prop` is it doesn't exists in the pandaDB
 * @returns `prop`'s value.
 */
  ensure (prop, defaultValue) {
    if(!prop || !defaultValue) throw new Error("Property or value missing");
    prop = String(prop);
    if(!data[prop]) {
      data[prop] = defaultValue;
      this.save();
    }
    return data[prop];
  }

  /**
   * Deletes a key.
   * @param {String} prop 
   * @param {*} path 
   */
  delete (prop, path) {
    if(!prop) throw new Error("Property missing");
    prop = String(prop);
    path = path ? String(path) : nullw;
    if(data[prop]) {
      delete data[prop];
      this.save();
      return true;
    }
    else return false;
  }

  /**
   * @returns {Array<string>} Array of indexes in the pandaDB.
   */
  get keys () {
    return Object.keys(data);
  }
  
/**
 * Return 
 */
  get size () {
    return Object.keys(data).length;
  }
};

module.exports = PandaDB;
