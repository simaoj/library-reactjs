import React, {useEffect, useState} from 'react';
import BookCard from './BookCard';
import {Fab, CircularProgress, Grid, IconButton} from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
 
import instance from '../../api/instance';
const BOOKS_URL = '/books';


const Books = () => {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  
  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  useEffect(()=>{
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await instance.get(BOOKS_URL, config);
      setBooks(response.data);
      setLoading(false);
    }
    fetchData()
    .catch(console.error);
  }, [])



  return (
    <main>
      {loading ?
        <CircularProgress />
      :
        <>
          <Grid 
            container 
            justifyContent="flex-start"
            direction="row"
            alignItems="flex-start"
            spacing={2}>
              {books.map(book => (
                <Grid item xs={2}>
                  <BookCard book={book}/>
                </Grid>
              ))}
          </Grid>
          <Fab variant="contained" sx={fabStyle} onClick={ ()=>{ navigate('/books/create') } }>
            <AddIcon />
          </Fab>
        </>
      }
    </main>
  );
}


export default Books;