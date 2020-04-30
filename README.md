# Panda-DB
 **Panda-db is a very simple .json based database**

![GitHub repo size](https://img.shields.io/github/repo-size/PandaDriver156/panda-db?label=Repository%20Size&logo=github)
![npm](https://img.shields.io/npm/dt/panda-db?label=Downloads&logo=npm)
# Installation
## For stable
<pre>
//Using npm
npm i panda-db

//Using yarn
yarn add panda-db
</pre>
# Constructor options
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>options</td>
            <td>object</td>
            <td>Options for the database</td>
            <td><code>{}</code></td>
        </tr>
        <tr>
            <td>options.name</td>
            <td>string</td>
            <td>The name of the pandaDB and the json file</td>
            <td><code>PandaDB</code></td>
        </tr>
        <tr>
            <td>options.dir</td>
            <td>string</td>
            <td>Directory path where the json file will be stored</td>
            <td><code>./pandaDB</code></td>
        </tr>
        <tr>
            <td>options.autoSave</td>
            <td>boolean</td>
            <td>Whether to automatically update the json file when changes were made</td>
            <td><code>true</code></td>
        </tr>
    </tbody>
</table>

# Properties
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Returns</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>get(property, [path])</th>
            <td>Gets a property from the database. <code>path</code> can be used if <code>property</code> is an object</td>
            <td>Value of <code>property</code></td>
        </tr>
        <tr>
            <th>set(property, value, [path])</th>
            <td>Changes the value of the specified element. <code>path</code> can be used if <code>property</code> is an object</td>
            <td><code>pandaDB</code></td>
        </tr>
        <tr>
            <th>delete(property, path)</th>
            <td>Deletes a key</td>
            <td><code>Boolean</code> (whether the delete was successful)</td>
        </tr>
        <tr>
            <th>ensure(property, defaultValue)</th>
            <td>Ensures that <code>property</code> exists</td>
            <td><code>property</code>'s value</td>
        </tr>
        <tr>
            <th>has(key, path)</th>
            <td>Checks if a property exists in the pandaDB</td>
            <td><code>Boolean</code> Whether the specified element exists</td>
        </tr>
        <tr>
            <th>save()</th>
            <td>Updates the json file. This function doesn't need to be called if the <code>autoSave</code> option is true</td>
            <td><code>Boolean</code> Whether the save was successful</td>
        </tr>
        <tr>
            <th>keys</th>
            <td>Obtains all keys from the pandaDB</td>
            <td><code>Array</code> Array of keys</td>
        </tr>
        <tr>
            <th>size</th>
            <td>Amount of keys stored in the pandaDB</td>
            <td><code>Number</code></td>
        </tr>
    </tbody>
</table>
