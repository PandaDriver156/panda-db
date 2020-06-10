const fs = require('fs');
let data = {};
const PandaDBError = require('./error.js');

class PandaDB {

/**
 * Creates a new pandaDB
 * @param {Object} options Options for this pandaDB, optional.
 * @param {String} options.name The name of the pandaDB and the stored json file.
 * @param {String} options.dir Directory path where the json file will be stored. Defaults to `./pandaDB`.
 * @param {Boolean} options.autoSave Whether to automatically update the json file when changes were made.
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
    options.autoSave = Boolean(options.autoSave ? options.autoSave : true);

    if(!fs.existsSync(options.dir)) fs.mkdirSync(options.dir);

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
 * @returns {Boolean} Whether the save was successful
 */
  save () {
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
  * @returns {PandaDB} The current pandaDB.
  * @example
  * pandaDB.set('rating', 'pandaDB is easy to use!');
  * 
  * pandaDB.set("anObject", {});
  * 
  * pandaDB.set("anObject", "A value", "objectPath");
  */ 
  set (key, value, path) {
    if(key == undefined || value == undefined) throw new PandaDBError("key or value missing");
    key = String(key);
    path = path ? String(path) : undefined;
    if(path) {
      path = String(path);
     if(!data[key]) PandaDBError(`The property "${key}" does not exist in the PandaDB: ${this.options.name}`);
      data[key][path] = value;
    } else data[key] = value;
    
    if(this.options.autoSave) this.save();
    return this;
  }
  
  /**
   * Gets a property from the pandaDB.
   * @param {String} prop The property to get from the pandaDB
   * @param {String} path Optional, can be used if `prop` is an object.
   * @returns {*} Obtained value of `prop` or undefined if it doesn't exist.
   */
  get (prop, path) {
    if(prop == undefined) throw new PandaDBError("Property missing");
    prop = String(prop);
    if(path) {
      path = String(path);
      if (data[prop]) return data[prop][path];
      throw new PandaDBError(`The property "${prop}" does not exist in the PandaDB: ${this.options.name}`);
    } 
    else return data[prop];
  }


  /**
   * Checks if a property exists in the pandaDB.
   * @param {String} property The key to check
   * @param {String} path Optional, can be used if `property` is an object.
   * @return {Boolean} Whether the property exists
   */
  has (property, path) {
    if(property == undefined) throw new PandaDBError("Property missing");
    property = String(property);
    if(path) {
      path = String(path);
      if (data[property]) return data[property][path] != undefined;
      throw new PandaDBError(`The property "${property}" does not exist in the PandaDB: ${this.options.name}`);
    } 
    else return data[property] != undefined;
  }
  
/**
 * Ensures that `prop` exists.
 * @param {*} prop The property to ensure in the pandaDB
 * @param {*} defaultValue The value to be assigned to `prop` is it doesn't exists in the pandaDB
 * @returns {*} `prop`'s value.
 */
  ensure (prop, defaultValue) {
    if(prop == undefined || defaultValue == undefined) throw new PandaDBError("Property or value missing");
    prop = String(prop);
    if(data[prop] == undefined) {
      data[prop] = defaultValue;
      if(this.options.autoSave) this.save();
    }
    return data[prop];
  }

  /**
   * Deletes a key.
   * @param {String} prop 
   * @param {*} path 
   * @returns {Boolean} Whether the delete happened.
   */
  delete (prop, path) {
    if(!prop) throw new PandaDBError("Property missing");
    prop = String(prop);
    path = path ? String(path) : null;
    if(data[prop]) {
      const deleted = delete data[prop];
      if(this.options.autoSave) this.save();
      return deleted;
    }
    else return false;
  }

  /**
   * Obtains all keys from the pandaDB.
   * @returns {Array<string>} Array of indexes in the pandaDB.
   */
  get keys () {
    return Object.keys(data);
  }
  
/**
 * Amount of keys stored in the pandaDB.
 * @returns {Number} The size of the pandaDB.
 */
  get size () {
    return Object.keys(data).length;
  }
}

module.exports = PandaDB;
