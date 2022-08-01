import React, {useEffect, useState, useRef} from 'react';
import { Typography, Box, Button, TextField, IconButton, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import ISBN from 'isbnjs';


import { useNavigate } from 'react-router-dom';

import instance from '../../api/instance';
import axios from 'axios';
const BOOKS_URL = '/books';


const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [isbn, setIsbn] = useState('');
  const [cover, setCover] = useState('');

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const hiddenFileInput = useRef();

  const findCover = async data => {
    const books = data.filter(book => 'imageLinks' in book.volumeInfo);
    const book = books.find(book => 'thumbnail' in book.volumeInfo.imageLinks);
    const url = 'https://www.googleapis.com/books/v1/volumes/';
    const query = "?fields=volumeInfo(title,imageLinks)"
    const response = await instance.get(url+book.id+query);
    const coverUrl = response.data.volumeInfo.imageLinks.medium;

    axios.get(coverUrl).then(blob => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        setCover(reader.result);
      };
    })

    
  }

  const clearBookData = () => {
    setTitle('');
    setAuthor('');
    setPublisher('');
    setYear('');
    setPages('');
    setIsbn('');
    setCover('');
  }

  const fetchBookData = async () => {
    clearBookData();
    const url = 'https://www.googleapis.com/books/v1/volumes?q=';
    const response = await instance.get(url+query);
    const book = response.data.items[0].volumeInfo;
    setTitle(book.title);
    setAuthor(book.authors.join(", "));
    setPublisher(book?.publisher);
    setYear(book?.publishedDate?.split('-')[0]);
    setPages(book.pageCount);
    setIsbn(book.industryIdentifiers.find(i => i.type === "ISBN_13").identifier);
    findCover(response.data.items).then(thumb => { if(thumb !== undefined) setCover(thumb) });
    setShowForm(true);
  }

  const handleCoverUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCover(reader.result);
    };
  }

  const handleSave = () => {
    const payload = {
      title: title,
      author: author,
      publisher: publisher,
      year: year,
      pages: pages,
      isbn: isbn
    };

    setLoading(true);

    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    instance.post(BOOKS_URL, payload, config);
    navigate(BOOKS_URL);
  }

  const inputFull = {
    marginBottom: 2, 
    width: '100%',
    display: 'flex'
  }

  

  return (
    <main>
      <Typography variant="h4" sx={{marginBottom: 3}}>Add Book</Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs>
                <TextField id="query" label="Enter book title" variant="filled" value={query} sx={inputFull} onChange={e => {setQuery(e.target.value);}} required/>
              </Grid>
              <Grid item xs>
                <Button aria-label="search" variant="contained" onClick={fetchBookData} sx={{marginTop: 1}}>
                  <SearchIcon />
                </Button >
              </Grid>
            </Grid>
          </Box>
          { showForm ? 
          <Box component="form">
            <TextField id="title" label="Title" variant="filled" value={title} sx={inputFull} onChange={e => setTitle(e.target.value)} required/>
            <TextField id="author" label="Author" variant="filled" value={author} sx={inputFull} onChange={e => setAuthor(e.target.value)} required/>
            <TextField id="publisher" label="Publisher" variant="filled" value={publisher} sx={inputFull} onChange={e => setPublisher(e.target.value)} required/>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <TextField id="year" label="Year" variant="filled" value={year} sx={inputFull} onChange={e => setYear(e.target.value)} required/>
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField id="pages" label="Pages" variant="filled" value={pages} sx={inputFull} onChange={e => setPages(e.target.value)} required/>
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField id="isbn" label="ISBN" variant="filled" value={isbn} sx={inputFull} onChange={e => setIsbn(e.target.value)} required/>
              </Grid>
            </Grid>
          </Box>
          : <></>
          }
        </Grid>
        <Grid item lg={2} xs={12}>
        { showForm ?
          <>
            { cover ? 
              <img src={cover} style={{height: 400}}/>
              :
              <img src="/images/cover-placeholder.png" style={{height: 400}}/>
            }
            <Button 
              variant="contained"
              endIcon={<ImageIcon />}
              sx={{marginTop: 3, whiteSpace: 'nowrap', minWidth: 'auto'}}
              onClick={()=>{ hiddenFileInput.current.click() }}
              disableElevation>
              Upload Cover
            </Button>
            <input type="file" accept="image/*" ref={hiddenFileInput} onClick={ e => { handleCoverUpload(e) }} style={{display:'none'}} />
          </>
          : <></>
          
        } 
        </Grid>
      </Grid>
      <div>
        <Button variant="contained" endIcon={<SaveIcon />} sx={{marginTop: 3}} onClick={handleSave}>
          Save
        </Button>
      </div>
    </main>
  );
}


export default CreateBook;