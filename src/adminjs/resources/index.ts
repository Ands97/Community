import { ResourceWithOptions } from "adminjs";
import { Category, Course, User } from "../../app/models";
import { categoryResourceOptions } from "./category";
import { courseResourceOptions, courseResourcesFeatures } from "./course";
import { Episode } from "../../app/models/Episode";
import { episodeResourceOptions, episodeResourcesFeatures } from "./episode";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    },
    {
        resource: Course,
        options: courseResourceOptions,
        features: courseResourcesFeatures
    },
    {
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourcesFeatures
    },
    {
        resource: User,
        options: userResourceOptions
    }
]