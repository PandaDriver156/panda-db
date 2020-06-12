# Panda-DB

 **Panda-db is a very simple .json based database**

![GitHub repo size](https://img.shields.io/github/repo-size/PandaDriver156/panda-db?label=Repository%20Size&logo=github)
![npm](https://img.shields.io/npm/dt/panda-db?label=Downloads&logo=npm)

## Installation

<pre>
//Using npm
npm i panda-db

//Using yarn
yarn add panda-db
</pre>

## Example usage

```js
const PandaDB = require('panda-db');

const DB = new PandaDB({
    name: "testing",
    dir: "./database"
});
```

## Documentation

 * [API Refenece](./docs/api.md)