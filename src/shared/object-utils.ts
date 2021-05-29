import { Immutable } from '../../typings/immutable';

type ObjectLike = Record<string | symbol, unknown>;

// export function deepFreeze<T extends ObjectLike>(obj: T): Immutable<T> {
//   Object.keys(obj).forEach((prop) => {
//     if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop]))
//       deepFreeze(obj[prop] as ObjectLike);
//   });
//   return Object.freeze(obj) as Immutable<T>;
// }

export function deepFreeze<T>(obj: T): Immutable<T> {
  Object.values(obj).forEach((value) => {
    if (!Object.isFrozen(value)) deepFreeze(value);
  });
  return Object.freeze(obj) as Immutable<T>;
}

export function propName<T extends ObjectLike>(obj: T): T {
  return new Proxy(obj, { get: (_, key) => key });
}

export function propNameSelector<T extends ObjectLike>(
  obj: T,
  selector: (x: T) => keyof T
): keyof T {
  return selector(propName(obj));
}

type NameOf<T> = { [P in keyof T]: keyof T };
type NameOfSelector<T> = (x: NameOf<T>) => keyof T;

export function nameof<T>(obj: T): NameOf<T> {
  return Object.keys(obj).reduce((res, key) => {
    const typedKey = key as keyof T;
    res[typedKey] = typedKey;
    return res;
  }, {} as NameOf<T>);
}

export function nameofSelector<T>(
  obj: T,
  selector: NameOfSelector<T>
): keyof T {
  return selector(nameof(obj));
}
