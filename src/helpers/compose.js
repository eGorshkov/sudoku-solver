export function compose(...fns) {
  return (...args) => fns.reduceRight((acc, fn) => fn(acc), args.length > 1 ? args : args[0]);
}