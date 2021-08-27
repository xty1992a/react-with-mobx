export function shouldPass(required: string[], funcCodes: string[]) {
  return required.every((key) => funcCodes.includes(key));
}
