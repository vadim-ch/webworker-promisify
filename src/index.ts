export function webworkerPromisify<T>(fn: Function): (data?: any) => Promise<T> {
  return (...data) => {
    const blob = new Blob([`
              var fn = ${fn};
              var data = ${JSON.stringify(data)};
              postMessage(fn(...data));
              `]);
    const worker = new Worker(URL.createObjectURL(blob));

    return new Promise((resolve, reject) => {
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
