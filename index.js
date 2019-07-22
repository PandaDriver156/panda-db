const fs = require('fs');
let data = {};

class PandaDB extends Map {

  constructor(options = {}) {
    super();
    options.name = String(options.name || 'PandaDB');
    options.dir = options.dir ? String(options.dir) : './pandaDB';
    options.backup = Boolean(options.backups || true);
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
  

  save() {
    try {
      fs.writeFileSync(`${process.cwd()}/${this.options.dir}/${this.options.name}.json`, JSON.stringify(data, null, 2));
      data = require(`${process.cwd()}/${this.options.dir}/${this.options.name}.json`);
      return true;
    } catch {
      return false;
    }
  }
  
  set(prop, value, path) {
    if(!prop || !value) throw new Error("Property or value missing");
    prop = String(prop);
    if(path) {
      const propInDB = this.get(prop);
      if(propInDB == undefined) throw new Error(`path is specified but the property "${prop}" does not exixst. Database name: ${this.name}`)
      path = String(path);
      const propType = typeof propInDB;
      if(propType != "object") throw new Error(`path is specified but the property's type is not an object. property type: ${propType}`);
      propInDB[path] = value;
    }
    
    this.save();
    return super.set(prop, value);
  }
  
  get (prop, path) {
    if(!prop) throw new Error("Property missing");
    if(path) {
       if (data[prop]) return data[prop][path];
        throw new Error(`The property ${prop} does not exist in the PandaDB: ${this.options.name}`);
    } else return data[prop];
  }
  
  ensure (prop, value) {
    if(!prop || !value) throw new Error("Property or value missing");
    prop = String(prop);
    if(!data[prop]) {
      data[prop] = value;
      this.save();
    }
    return data[prop];
  }
  
  delete (prop, path) {
    if(!prop) throw new Error("Property missing");
    prop = String(prop);
    path = String(path);
    if(data[prop]) return delete data[prop];
    else return;
  }
  
};

module.exports = PandaDB;
