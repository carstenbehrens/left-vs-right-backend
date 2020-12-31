export interface IImageService {
  /**
   * Save the image to an external server from where it will be served on the client
   * @param imagePath The remote HTTP or HTTPS URL adress of an existing file
   * @returns The path to the image after we upload it on server (e.g. aws s3)
   */
  save(imagePath: string): Promise<string>;
}
