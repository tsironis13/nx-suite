export type Primitive = string | number | boolean;

export type ExludeId<T> = {
  [P in keyof T as Exclude<P, 'id'>]: T[P];
};
