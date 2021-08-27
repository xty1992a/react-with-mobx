export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const uniq = (arr: any[]) => Array.from(new Set(arr));

export function typeOf(obj: any): string {
  const type = typeof obj;
  if (type !== "object") return type;
  if (obj === null) return "null";
  return Array.isArray(obj) ? "array" : "object";
}
/**
 * 以source为模板,返回新对象,target将覆盖同名属性
 * @param source
 * @param target
 * @returns
 */
export function merge<T = any>(source: any, target = {} as any): T {
  // const type = typeOf(source);
  return Object.keys(source).reduce((map, key) => {
    let value = source[key];
    const type = typeof value;
    let isProvide = target.hasOwnProperty(key);
    if (isProvide) {
      if (type === "object") {
        value = merge(value, target[key]);
      } else {
        value = target[key];
      }
    }

    return typeOf(map) === "array" ? [...map, value] : { ...map, [key]: value };
  }, target);
}
