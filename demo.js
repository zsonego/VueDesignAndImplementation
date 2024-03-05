const jobQueue = new Set();
const p = Promise.resolve();
let isFlushing = false;

function flushJob() {
  if (isFlushing) return;
  isFlushing = true;
  p.then(() => {
    jobQueue.forEach((job) => job());
  }).finally(() => {
    isFlushing = false;
  });
}

let number = 1;
let fn = () => {
  console.log(number);
};
jobQueue.add(fn);
number++;
flushJob();
jobQueue.add(fn);
number++;
flushJob();
jobQueue.add(fn);
number++;
flushJob();
