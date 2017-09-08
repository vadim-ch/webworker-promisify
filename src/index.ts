export function webworkerPromisify<T>(fn: Function): (data: any) => Promise<T> {
  const workerHandler = (fn) => {
    onmessage = (ev) => {
      postMessage(fn(...ev.data), null);
    };
  };

  const worker = new Worker(
      URL.createObjectURL(
          new Blob(['('+workerHandler+')('+fn+')'])
      )
  );

  return (...data) => {
    return new Promise((resolve, reject) => {
      worker.postMessage(data);
      worker.onmessage = (ev) => {
        resolve(ev.data);
        worker.terminate();
      }
    });
  }
}
