import { API } from "src/classes/API";

// Import types
import type { RegisterUser } from "src/objects/User";

type Activation = {
  username: string;
  code: string;
}

export class AuthAPI extends API
{
  constructor(base: string) {
    super(base);
  }

  async signupAsync(user: RegisterUser) {
    const url = this.base + "/sign-up";
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    return (await response).json();
  }

  async activateAccountAsync(activation: Activation) {
    const url = this.base + "/activate-account";
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activation)
    });

    return (await response).json();
  }
}