import { ResourceWithOptions } from "adminjs";
import { Category } from "../../app/models";
import { categoryResourceOptions } from "./category";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    }
]