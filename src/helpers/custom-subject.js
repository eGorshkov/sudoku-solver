// export class Subject {
//   value = null;
//   nextFunctions = [];
//   constructor(v) {
//     this.subscribe(v);
//   }
//   next(cb) {
//     this.nextFunctions.push(cb);
//     cb(this.value);
//     return this;
//   }
//   subscribe(v) {
//     this.value = v;
//     this.nextFunctions.forEach(cb => cb(v));
//   }
//   getValue() {
//     return this.value;
//   }
//   bind(v) {
//     return this.subscribe.bind(this, v)
//   }
// }

export function Subject(v) {
  this.nextFunctions = [];
  this.value = null;
  this.subscribe(v);
  return this;
}

Subject.prototype.next = function(cb) {
  this.nextFunctions.push(cb);
  cb(this.value);
};

Subject.prototype.subscribe = function(v) {
  this.value = v;
  this.nextFunctions.forEach(cb => cb(v));
};

Subject.prototype.bind = function(v) {
  return this.subscribe.bind(this, v)
};

Subject.prototype.getValue = function() {
  return this.value;
};
