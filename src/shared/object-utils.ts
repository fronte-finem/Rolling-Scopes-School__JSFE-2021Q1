type ObjectLike = Record<string | symbol, unknown>;

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
