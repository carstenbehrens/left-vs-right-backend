export default interface IDay {
  _id: string;
  date: Date;
  images: [
    {
      name: String;
      alt: String;
      img: {
        data: Buffer;
        contentType: String;
      };
    }
  ];
}
