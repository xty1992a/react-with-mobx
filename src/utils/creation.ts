/**
 * 生成随机字符串
 * @param {number} len
 * @returns
 */
export const randomString = (len?: number) => {
  const length: number = len || 32;
  const $chars =
    "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * 生成请求traceId
 */
export const createTraceId = () => {
  const time = Date.now(); // 13位
  const str = randomString(35);
  return time + str;
};

export const rdm = () => Math.random().toString(36).substr(2, 15);

export const ranger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
