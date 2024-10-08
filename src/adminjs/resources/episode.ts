import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";
import UploadProvider from "../CustomProvider/UploadProvider";

export const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'secondsLong'  ],
  filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt']
}

export const episodeResourcesFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: new UploadProvider(path.join(__dirname, '..', '..', '..', 'uploads')),
    properties: {
      key: 'videoUrl',
      file: 'uploadVideo'
    },
    uploadPath: (record, filename) => `video/course-${record.get('courseId')}/${filename}`
  }),
]