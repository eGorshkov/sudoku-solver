export function compose(...fns) {
  return (...args) => fns.reduceRight((acc, fn) => fn.apply(null, Array.isArray(acc) ? acc : [acc]), args);
}