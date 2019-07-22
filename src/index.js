const fs = require('fs');
let data = {};

class PandaDB {

  constructor(options = {}) {
      options.name = String(options.name || 'PandaDB');
    options.dir = options.dir ? String(options.dir) : './database';
    if(!fs.existsSync(options.dir)) fs.mkdirSync(options.dir);
    Object.defineProperties(this, {
      size: {
        value: () => Object.keys(data).length
      },
      options: {
        value: options
      },
      indexes: {
        value:  () => Object.keys(data)
      },
      data: {
        value: () => data
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
    fs.writeFileSync(`${process.cwd()}/${this.options.dir}/${this.options.name}.json`, JSON.stringify(data).split('},').join('},\n'));
    data = require(`${process.cwd()}/${this.options.dir}/${this.options.name}.json`);
    return data;
  }

  
  set(prop, value, path) {
    if(!prop || !value) throw new Error("Property or value missing");
    prop = String(prop);
    path = path ? String(path) : undefined;
    if(path) {
      path = String(path);
     if(!data[prop]) data[prop] = {};
      data[prop][path] = value;
    } else data[prop] = value;
    
    this.save();
    return data[prop];
  }
  
  get (prop, path) {
    if(!prop) throw new Error("Prop missing");
    if(path) {
       if (data[prop]) return data[prop][path];
        throw new Error(`The property ${prop} does not exist in the ${this.options.name} Database`);
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
