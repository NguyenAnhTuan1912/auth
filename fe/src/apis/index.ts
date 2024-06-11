import { AuthAPI } from "./auth";

const __ROOT__ = import.meta.env.API_ROOT;

const __MainBases = {
  Auth: __ROOT__ + "/auth"
}

export const Auth_API = new AuthAPI(__MainBases.Auth);