import instance from '../api/instance';

export const getBookInfo = query => {
  const url = 'https://www.googleapis.com/books/v1/volumes?q=';
  const key = `&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  const response = await instance.get(url+title+key);
  return response.data.items[0].volumeInfo.imageLinks.thumbnail;
}

export const getBook = id => {

}