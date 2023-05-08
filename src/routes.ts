import { Response, Router } from "express";
import CategoriesController from "./app/controllers/CategoriesController";
import CoursesController from "./app/controllers/CoursesController";

class Routes {
  readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public getRoutes(): Router {
    return this.router;
  }

  public startRoutes(): Routes {
    this.router.get("/", async (_, res: Response) => {
      res.json({ message: "ok" });
    });

    this.categoriesRoutes();
    this.coursesRoutes();

    return this;
  }

  private categoriesRoutes(): void{
    this.router.get('/categories', CategoriesController.index);
    this.router.get('/categories/:id', CategoriesController.show)
  }

  private coursesRoutes(): void{
    this.router.get('/courses/:id', CoursesController.show)
  }

}

export default Routes;