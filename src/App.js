import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home/Home';
import Book from "./Book/Book";

export default function App() {

  const [books, setBooks] = useState([]);
  const [select, setSelect] = useState();

  async function fetchData() {
    const res = await fetch("https://www.anapioficeandfire.com/api/books/");
    res
      .json()
      .then(res => setBooks(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onSelectBook(book) {
    setSelect(book)
  }


  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home books={books} onSelectBook={onSelectBook} />
          </Route>
          <Route path="/book">
            <Book select={select} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
