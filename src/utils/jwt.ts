import Jwt from "jsonwebtoken";
import config from "config";

export async function signJwt(
  object: object,
  keyName: "aTPrK" | "rTPrK",
  options?: Jwt.SignOptions | undefined
) {
  // const signInKey = Buffer.from(config.get<string>(keyName), "base64").toString(
  //   "ascii"
  // );
  const signInKey = config.get<string>(keyName);
  return Jwt.sign(object, signInKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}
export function verifyJwt(token: string, keyName: "aTPK" | "rTPK") {
  const signInKey = config.get<string>(keyName);
  try {
    const decoded = Jwt.verify(token, signInKey);

    return decoded;
  } catch (error) {
    return error;
  }
}
