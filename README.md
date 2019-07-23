panda-db is a very simple json based database that is still under development.

# Installation
## For stable
<pre>
//Using npm
npm i panda-db

//Using yarn
yarn add panda-db
</pre>
## For veta
<pre>
//Using npm
npm i PandaDriver156/panda-db

//Using yarn
yarn add PandaDriver156/panda-db
</pre>
# Options
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
            <td>The name of the json file</td>
            <td><code>PandaDB</code></td>
        </tr>
        <tr>
            <td>options.dir</td>
            <td>string</td>
            <td>Directory path where the json file will be stored</td>
            <td><code>./pandaDB</code></td>
        </tr>
        <tr>
            <td>options.backup</td>
            <td>boolean</td>
            <td>Whether to create a backup file</td>
            <td><code>false</code></td>
        </tr>
        <tr>
             <td>options.backupInterval</td>
             <td>number</td>
             <td>In seconds, Delay to update the backup file</td>
             <td><code>60</code></td>
        </tr>
    </tbody>
</table>

# Methods
<table>
    <thead>
        <tr>
            <th>Method</th>
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
            <th>save()</th>
            <td>Updates the json file. This function doesn't need to be called if the <code>autoSave</code> option is true</td>
            <td><code>Boolean</code> Whether the save was successful</td>
        </tr>
    </tbody>
</table>
