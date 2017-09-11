# webworker-promisify

webworker-promisify is wrapper over a Webworker that allows to execute a function in a separate thread and returned Promise.

## How to use

`npm install webworker-promisify`

```js
import { webworkerPromisify } from 'webworker-promisify';
```

## Examples on TypeScript


### Promise

```js
let sum = (a, b) => {
  return a + b;
};
sum = webworkerPromisify<number>(sum);

sum(1, 2).then((data) => {
  console.log('data', data);
}).catch((err) => {
  console.error('err', err);
});

```

```js
const prepareData = data => {
  return data.map(item => (item.prepared = true, item));
};

sendRequest(id) // returned Promise with large array
  .then(data => {
    return webworkerPromisify(prepareData)(data); // changed data in Worker
  })
  .then(preparedData => {
    console.log('preparedData', preparedData); // returned preparedData
  });

```

### Async await

```js
let sum = (a, b) => {
  return a + b;
};
sum = webworkerPromisify<number>(sum);

try {
  const data = await sum(1, 2);
  console.log('data', data);
} catch (err) {
  console.error('err', err);
}
```

```js
const prepareData = data => {
  return data.map(item => (item.prepared = true, item));
};

const data = await sendRequest(id); // returned Promise with large array
const preparedData = await webworkerPromisify(prepareData)(data);
```
