<a name="PandaDB"></a>

## PandaDB
A very simple, json based database

**Kind**: global class  

* [PandaDB](#PandaDB)
    * [new PandaDB([options])](#new_PandaDB_new)
    * [.keys](#PandaDB+keys) ⇒ <code>array.&lt;string&gt;</code>
    * [.size](#PandaDB+size) ⇒ <code>number</code>
    * [.save()](#PandaDB+save) ⇒ <code>boolean</code>
    * [.set(key, value, [path])](#PandaDB+set) ⇒ [<code>PandaDB</code>](#PandaDB)
    * [.has(key, [path])](#PandaDB+has) ⇒ <code>boolean</code>
    * [.ensure(key, defaultValue)](#PandaDB+ensure) ⇒ <code>\*</code>
    * [.delete(key, [path])](#PandaDB+delete) ⇒ <code>boolean</code>

<a name="new_PandaDB_new"></a>

### new PandaDB([options])
Creates a new pandaDB


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{}</code> | Options for this pandaDB. |
| [options.name] | <code>string</code> | <code>&quot;PandaDB&quot;</code> | The name of the pandaDB and the stored json file. |
| [options.dir] | <code>string</code> | <code>&quot;./pandaDB&quot;</code> | Directory path where the json file will be stored. |
| [options.autoSave] | <code>boolean</code> | <code>true</code> | Whether to automatically update the json file when changes were made. |

**Example**  
```js
const PandaDB = require('panda-db');

const DB = new PandaDB({
 name: "testing",
 dir: "./database"
});
```
<a name="PandaDB+keys"></a>

### pandaDB.keys ⇒ <code>array.&lt;string&gt;</code>
Obtains all keys from the pandaDB.

**Kind**: instance property of [<code>PandaDB</code>](#PandaDB)  
**Returns**: <code>array.&lt;string&gt;</code> - Array of indexes in the pandaDB.  
<a name="PandaDB+size"></a>

### pandaDB.size ⇒ <code>number</code>
Amount of keys stored in the pandaDB.

**Kind**: instance property of [<code>PandaDB</code>](#PandaDB)  
**Returns**: <code>number</code> - The size of the pandaDB.  
<a name="PandaDB+save"></a>

### pandaDB.save() ⇒ <code>boolean</code>
Updates the json file. This function doesn't need to be called if the `autoSave` option is true.

**Kind**: instance method of [<code>PandaDB</code>](#PandaDB)  
**Returns**: <code>boolean</code> - Whether the save was successful.  
<a name="PandaDB+set"></a>

### pandaDB.set(key, value, [path]) ⇒ [<code>PandaDB</code>](#PandaDB)
Changes the value of the specified element

**Kind**: instance method of [<code>PandaDB</code>](#PandaDB)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to add/change in the pandaDB |
| value | <code>\*</code> | (new) value of the key |
| [path] | <code>string</code> | The path to modify inside `key` if its value is an object |

**Example**  
```js
pandaDB.set('rating', 'pandaDB is easy to use!');

pandaDB.set("anObject", {});

pandaDB.set("anObject", "A value", "objectPath");
```
<a name="PandaDB+get"></a>

### pandaDB.get(key, [path]) ⇒ <code>\*</code>
Gets a key from the pandaDB.

**Kind**: instance method of [<code>PandaDB</code>](#PandaDB)  
**Returns**: <code>\*</code> - Obtained value of `key` or undefined if it doesn't exist.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to get from the pandaDB. |
| [path] | <code>string</code> | Can be used if `key` is an object. |

<a name="PandaDB+has"></a>

### pandaDB.has(key, [path]) ⇒ <code>boolean</code>
Checks if a key exists in the pandaDB.

**Kind**: instance method of [<code>PandaDB</code>](#PandaDB)  
**Returns**: <code>boolean</code> - Whether the key exists.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to check. |
| [path] | <code>string</code> | Can be used if `key` is an object. |

<a name="PandaDB+ensure"></a>

### pandaDB.ensure(key, defaultValue) ⇒ <code>\*</code>
Ensures that `key` exists.

**Kind**: instance method of [<code>PandaDB</code>](#PandaDB)  
**Returns**: <code>\*</code> - `key`'s value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to ensure in the pandaDB. |
| defaultValue | <code>\*</code> | The value to be assigned to `key` is it doesn't exists in the pandaDB. |

<a name="PandaDB+delete"></a>

### pandaDB.delete(key, [path]) ⇒ <code>boolean</code>
Deletes a key.

**Kind**: instance method of [<code>PandaDB</code>](#PandaDB)  
**Returns**: <code>boolean</code> - Whether the delete was successful.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to delete from the pandaDB. |
| [path] | <code>\*</code> |  |

