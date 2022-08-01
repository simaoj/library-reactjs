import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import instance from '../../api/instance';

const BookCard = props => {

  const [cover, setCover] = useState();
  const navigate = useNavigate();

  useEffect( ()=> {
    const fetchCover = async title => {
      const url = 'https://www.googleapis.com/books/v1/volumes?q=';
      const response = await instance.get(url+props.book.title);
      const thumb = response.data.items[0].volumeInfo.imageLinks.thumbnail;
      console.log(response.data.items[0].volumeInfo)
      setCover(thumb);
    }
    fetchCover();
  });

  return (
    <Card sx={{ width:180 }} onClick={()=>{navigate(`/books/${props.book['_id']}`)}}>
      <CardActionArea>
        {cover ? 
          <CardMedia
          component="img"
          image={cover}
          alt="cover"
          height="270"
          />
          :
          <CircularProgress />
        }
        
        <CardContent sx={{ height: 100 }}>
          <Typography gutterBottom component="div">
            {props.book.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.book.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BookCard;