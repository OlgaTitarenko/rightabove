import React, { useState, useEffect } from 'react';
import "./Book.css";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Book(props) {

  const { select } = props;
  const [characters, getCharacters] = useState([]);
  const [circle, changeCircle] = useState(true);

  if (select.povCharacters.length === 0 && circle === true) {
    changeCircle(false);
  }

  async function fetchData(url, closeCircle) {
    const res = await fetch(url);
    res
      .json()
      .then(res => {

        getCharacters(characters => [...characters, res]);
        if (closeCircle) {
          changeCircle(false);
        }
      }
      )
      .catch(err => console.log(err));
  }

  useEffect(() => {
    select.povCharacters.forEach((pov, key) => {
      fetchData(pov, key === select.povCharacters.length - 1);
    })


  }, []);


  return (
    <div className="book">
      <h1>You select a book "{select.name}"</h1>
      <p>Author - <b>{select.authors}</b></p>
      <p>Media type - <b>{select.mediaType}</b></p>
      <p>Number of pages - <b>{select.numberOfPages}</b></p>
      <p>Publisher - <b>{select.publisher}</b></p>
      <div>
        <h3>Characters: </h3>
        {circle ? <CircularProgress /> : <ul>{characters.map((item, key) => <li key={"character" + key}>{item.name}</li>)}</ul>}
        {(characters.length === 0) && <p>Sorry, no characters</p>}
      </div>
    </div>
  )


}