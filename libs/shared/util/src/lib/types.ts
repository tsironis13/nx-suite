import { Signal } from '@angular/core';
import { Observable } from 'rxjs';

export type OmitNever<T> = {
  [Key in keyof T as T[Key] extends never ? never : Key]: T[Key];
};

export type OmitNullish<T> = {
  [Key in keyof T as T[Key] extends never | null | undefined | never[] | void
    ? never
    : Key]: T[Key];
};

export type ExcludeSymbolKey<T> = Exclude<keyof T, symbol>;

export type IsNever<T> = [T] extends [never] ? true : false;

export type ValueOrNever<TValue extends object> =
  ObjectValues<TValue> extends never[] ? never : TValue;

export type ValueOrReactive<TValue> =
  | TValue
  | Observable<TValue>
  | Signal<TValue>;

export type ValuesOrReactivesMap<T extends Record<string, unknown>> = {
  [Key in keyof T]: ValueOrReactive<T[Key]>;
};

export type OptionalUndefinedProperties<T extends object> = {
  [Key in keyof T as IsNever<Extract<T[Key], undefined>> extends true
    ? never
    : Key]?: T[Key];
} & {
  [Key in keyof T as IsNever<Extract<T[Key], undefined>> extends true
    ? Key
    : never]: T[Key];
};

export type AsSignals<T extends Record<string, unknown>> = {
  [Key in keyof T]: Signal<T[Key]>;
};

export type ObjectKeys<T extends object> = Array<`${ExcludeSymbolKey<T>}`>;

export type ObjectEntries<T extends object> = Array<
  [ObjectKeys<T>[number], ObjectValues<T>[number]]
>;

export type ObjectValues<T extends object> = ExcludeSymbolKey<T> extends never
  ? never[]
  : Array<T[ExcludeSymbolKey<T>]>;

export type ValueOrFactory<T> = T | (() => T);
