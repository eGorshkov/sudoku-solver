// export class Subject {
//   value = null;
//   subscribeFunctions = [];
//   constructor(v) {
//     this.next(v);
//   }
//   subscribe(cb) {
//     this.subscribeFunctions.push(cb);
//     return this;
//   }
//   next(v) {
//     this.value = v;
//     this.subscribeFunctions.forEach(cb => cb(v));
//   }
//   getValue() {
//     return this.value;
//   }
//   bind(v) {
//     return this.subscribe.bind(this, v)
//   }
// }

export function Subject(v) {
  this.subscribeFunctions = [];
  this.value = null;
  this.next(v);
  return this;
}

Subject.prototype.subscribe = function (cb) {
  this.subscribeFunctions.push(cb);
  cb(this.value);
};

Subject.prototype.next = function (v) {
  this.value = v;
  this.subscribeFunctions.forEach(cb => cb(v));
};

Subject.prototype.bind = function (v) {
  return this.next.bind(this, v);
};

Subject.prototype.getValue = function () {
  return this.value;
};
