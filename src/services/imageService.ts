import { Service, Inject } from 'typedi';
import { IImageService } from '../interfaces/IImageService';
import { ILogger } from '../interfaces/ILogger';
import cloudinary from 'cloudinary';
import config from '../config';

@Service()
export default class ImageService implements IImageService {
  constructor(@Inject('logger') private logger: ILogger) {}

  public async save(imagePath: string): Promise<string> {
    try {
      cloudinary.v2.config(config.cloud);
      const result = await cloudinary.v2.uploader.upload(imagePath, {});
      return result.url;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
