import { Response, Router } from "express";
import CategoriesController from "./app/controllers/CategoriesController";
import CoursesController from "./app/controllers/CoursesController";
import EpisodesController from "./app/controllers/EpisodesController";

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
    this.episodesRoutes();
    return this;
  }

  private categoriesRoutes(): void{
    this.router.get('/categories', CategoriesController.index);
    this.router.get('/categories/:id', CategoriesController.show);
  }

  private coursesRoutes(): void{
    this.router.get('/courses/featured', CoursesController.getFatured);
    this.router.get('/courses/newest', CoursesController.getNewest);
    this.router.get('/courses/search', CoursesController.search);
    this.router.get('/courses/:id', CoursesController.show);
  }

  private episodesRoutes(): void {
    this.router.get('/episodes/stream', EpisodesController.stream)
  }

}

export default Routes;