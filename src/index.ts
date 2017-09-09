export function webworkerPromisify<T>(fn: Function): (data?: any) => Promise<T> {
  return (...data) => {
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

    return new Promise((resolve, reject) => {
      worker.postMessage(data);
      worker.onmessage = (ev: MessageEvent) => {
        worker.terminate();
        resolve(ev.data);
      };
      worker.onerror = (err: ErrorEvent) => {
        worker.terminate();
        reject(err.message);
      }
    });
  }
}
