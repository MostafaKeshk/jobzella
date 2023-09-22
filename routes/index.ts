class Routes {
  static home = "/";
  static login = "/login";
  static getGroup = (id: string) => `?group=${id}`;
}

export default Routes;
