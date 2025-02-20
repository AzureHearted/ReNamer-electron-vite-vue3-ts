/**
 * 递归构造对象的嵌套属性路径类型
 *
 * 例如：
 * ```ts
 * type User = { name: string; details: { age: number; address: { city: string } } };
 * ObjectPath<User, keyof User> => "name" | "details" | "details.age" | "details.address" | "details.address.city"
 * ```
 *
 * @template T - 目标对象类型
 * @template K - 当前层级的键名（必须是 T 的 key）
 */
export type ObjectPath<T, K extends keyof T> = K extends string
  ? T[K] extends object
    ? `${K}.${ObjectPath<T[K], keyof T[K]>}` | K // 递归拼接嵌套路径
    : K // 如果是基本类型（非对象），终止递归
  : never

/**
 * 根据字符串路径获取对象的嵌套属性值
 *
 * 例如：
 * ```ts
 * const user = { name: "Alice", details: { age: 25, address: { city: "New York" } } };
 * getValue(user, "details.address.city"); // 返回 "New York"
 * getValue(user, "details.age"); // 返回 25
 * getValue(user, "unknown"); // TS 报错（路径不合法）
 * ```
 *
 * @param obj - 目标对象
 * @param path - 以 `.` 分隔的属性路径
 * @returns 对应路径的值，如果路径不存在则返回 `undefined`
 */
export function getObjectValue<T, P extends ObjectPath<T, keyof T>>(obj: T, path: P): any {
  return path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj)
}
/**
 * 安全获取对象的嵌套属性值，路径不存在时返回 `undefined`
 *
 * @param obj - 目标对象
 * @param path - 以 `.` 分隔的属性路径（可以是任意字符串）
 * @returns 目标值，路径无效时返回 `undefined`
 */
export function safeGetObjectValue<T>(obj: T, path: string): any {
  return path
    .split('.')
    .reduce(
      (o, key) =>
        o !== null && typeof o === 'object' && key in o
          ? (o as Record<string, any>)[key]
          : undefined,
      obj
    )
}
