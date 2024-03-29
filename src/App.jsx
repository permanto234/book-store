import { useEffect, useState } from "react";

import "./App.css";
import { AgGridReact } from "ag-grid-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddBook from "./AddBook";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [books, setBooks] = useState([]);
  const appUrl =
    "https://bookstore-21565-default-rtdb.firebaseio.com/books/.json";


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch(appUrl)
      .then((response) => response.json())
      .then(data => addKeys(data))
      .catch((err) => console.error(err));
  };

  const addBook = (newBook) => {
    fetch(appUrl, {
      method: "POST",
      body: JSON.stringify(newBook),
    })
      .then((response) => fetchBooks())
      .catch((err) => console.error(err));
  };

  
  const deleteTodo = (id) => {
    fetch(`https://bookstore-21565-default-rtdb.firebaseio.com/books/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(response => fetchBooks())
    .catch(err => console.error(err))
  }

  
  // Add keys to the book objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
    Object.defineProperty(item, 'id', {value: keys[index]}));
    setBooks(valueKeys);
  }

  const columnDefs = [
    { field: "author", sortable: true, filter: true },
    { field: "isbn", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
    { field: "title", sortable: true, filter: true },
    { field: "year", sortable: true, filter: true },
    { 
      headerName: '',
      field: 'id',
      width: 90,
      cellRenderer: params => 
      <IconButton onClick={() => deleteTodo(params.value)} size="small" color="error">
        <DeleteIcon />
      </IconButton> 
    }
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Bookstore</Typography>
        </Toolbar>
      </AppBar>
      <AddBook addBook={addBook}/>
      <div className="ag-theme-material" style={{ height: 600, width: 1200 }}>
        <AgGridReact rowData={books} columnDefs={columnDefs} />
      </div>
    </>
  );
}

export default App;
