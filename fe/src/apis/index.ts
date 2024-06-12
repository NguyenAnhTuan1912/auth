import { AuthAPI } from "./auth";

const __ROOT__ = import.meta.env.VITE_API_ROOT;

console.log(import.meta.env);

const __MainBases = {
  Auth: __ROOT__ + "/auth"
}

export const Auth_API = new AuthAPI(__MainBases.Auth);