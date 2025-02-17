# Arweave-Bundles (ANS-102)

**NOTE:** This package uses the older (ANS-102) standard. Check out [ArBundles](https://github.com/Bundler-Network/arbundles) for the new one (ANS-104). This version includes a more efficient indexing and encoding system.

This library contains routines to create, read, and verify Arweave bundled data.

See [ANS-102](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-102.md) for more details.

## Installing the library

You need to first have NodeJS and NPM installed. Then you can run:

```
npm install arweave-bundles
```

## Initializing the library

This is a self-contained library, so we need to initialize the API with a couple of dependencies:

```javascript
import Arweave from "arweave";
import deepHash from "arweave/node/lib/deepHash";
import ArweaveBundles from "arweave-bundles";

const deps = {
  utils: Arweave.utils,
  crypto: Arweave.crypto,
  deepHash: deepHash,
};

const arBundles = ArweaveBundles(deps);
```

## Unbundling from a Transaction containing DataItems

```javascript
const txData = myTx.get("data", { decode: true, string: true });

// Will extract and verify items, returning an array of valid
// DataItems.
const items = await ArweaveBundles.unbundleData(txData);
```

## Reading data and tags from a DataItem

```javascript
const item = items[1]; // get a single item out of the array returned in the previous step.

// get data as Uint8Array.
const data = await arBundles.decodeData(item, { string: false });
// get data as utf8 string.
const data = await arBundles.decodeData(item, { string: true });

// get id, owner, target, signature, nonce
const id = item.id;
const owner = item.owner;
const target = item.taget;
const signature = item.signature;
const nonce = item.none;

for (let i = 0; i < item.tags.length; i++) {
  const tag = await arBundles.decodeTag(item.tag);
  // tag.name
  // tag.value
}
```

## Creating a DataItem

```javascript
const myTags = [
  { name: "App-Name", value: "myApp" },
  { name: "App-Version", value: "1.0.0" },
];

let item = await arBundles.createData(
  { to: "awalleet", data: "somemessage", tags: myTags },
  wallet
);

// Add some more tags after creation.
arBundles.addTag(item, "MyTag", "value1");
arBundles.addTag(item, "MyTag", "value2");

// Sign the data, ready to be added to a bundle
let data = await arBundles.sign(item, wallet);
```

## Bundling up DataItems and writing a transaction

```javascript
const items = await makeManyDataItems();

// Will ensure all items are valid and have been signed,
// throwing if any are not
const myBundle = await arBundles.bundleData(items);

const myTx = await arweave.createTransaction(
  { data: JSON.stringify(myBundle) },
  wallet
);

myTx.addTag("Bundle-Format", "json");
myTx.addTag("Bundle-Version", "1.0.0");
myTx.addTag("Content-Type", "application/json");

await arweave.transactions.sign(myTx, wallet);
await arweave.transactions.post(myTx);
```
