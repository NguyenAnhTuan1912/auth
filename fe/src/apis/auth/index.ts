import { API } from "src/classes/API";

// Import types
import type { IAPIMethods } from "src/types/API";

export class AuthAPI extends API
  implements IAPIMethods
{
  constructor(base: string) {
    super(base);
  }

  getAsync<T>(...args: T[]): Promise<any> {
    
  }
}