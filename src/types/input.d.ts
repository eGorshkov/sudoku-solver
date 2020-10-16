export interface IInputCallback {
  input: (...args) => Function;
  focus: (...args) => Function;
  blur: (...args) => Function;
}
export interface IInput {
  callbackFn: IInputCallback
}
