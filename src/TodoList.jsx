import { useState } from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import ReactiveButton from 'reactive-button';

function TodoList() {
  const [todo, setTodo] = useState({description: '', date: '', status: ''});
  const [todos, setTodos] = useState([]);

  // Column definitions for ag-grid
  const columnDefs = [
    { field: 'description' },
    { field: 'date' },
    { field: 'status'  }
   ]
  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: '', status: ''});
  }

  const [state, setState] = useState('idle');

  const onClickHandler = () => {
    setState('loading');

    addTodo()
    setTimeout(() => {
      setState('success');
    }, 2000);
  };

  return (
    <>
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" name="date" value={todo.date} onChange={inputChanged}/>
      <input placeholder="Status" name="status" value={todo.status} onChange={inputChanged}/>

      <ReactiveButton
      buttonState={state}
      idleText="Add"
      loadingText="Loading"
      successText="Done"
      rounded
      onClick={onClickHandler}
    />
      <div className="ag-theme-material" style={{height: 400, width: 600}}>
         <AgGridReact
            animateRows={true}
            rowData={todos}
            columnDefs={columnDefs}
         />
      </div>
    </>
  );
}

export default TodoList;