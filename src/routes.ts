import { Response, Router } from "express";

class Routes {
  readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public getRotas(): Router {
    return this.router;
  }

  public startRoutes(): Routes {
    this.router.get("/", async (_, res: Response) => {
      res.json({ message: "ok" });
    });

    return this;
  }

}

export default Routes;