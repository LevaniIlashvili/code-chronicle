export interface Blog {
  image: string;
  title: string;
  content: string;
  dateCreated: string;
  _id: string;
  creator: {
    email: string;
    username: string;
    image: string;
    _id: string;
  };
}
