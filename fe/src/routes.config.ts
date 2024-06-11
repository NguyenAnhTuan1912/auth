type RouteName = {
  path: string;
  name: string;
  canHideFromHeader?: boolean;
}

export const RouteNames: {[K: string]: RouteName} = {
  home: {
    path: "/home",
    name: "Home"
  },
  signup: {
    path: "/sign-up",
    name: "Sign-up",
    canHideFromHeader: true
  }
}