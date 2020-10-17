export interface IInputCallback {
  input: (...args) => Function | Array<(...args) => Function>;
  focus: (...args) => Function | Array<(...args) => Function>;
  blur: (...args) => Function | Array<(...args) => Function>;
}
export interface IInput {
  callbackFn: IInputCallback;
}
