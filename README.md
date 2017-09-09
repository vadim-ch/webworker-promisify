# webworker-promisify

webworker-promisify is wrapper over a Webworker that allows to execute a function in a separate thread and returned Promise.

## How to use

`npm install webworker-promisify`

## Examples on TypeScript


### Promise

```ts
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
