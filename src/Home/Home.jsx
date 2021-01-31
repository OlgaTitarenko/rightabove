import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import SimpleCard from './Card';


function Home(props) {

  // if (select) {
  //   return (<div>you select a book {select.name}</div>)
  // }
  const { books } = props;

  return (

    <div className="books">
      {books.map(book =>

        <Link key={book.released} to="/book">
          <div onClick={() => props.onSelectBook(book)} >
            <SimpleCard name={book.name} author={book.authors} numberOfPages={book.numberOfPages} />
          </div>
        </Link>
      )}
    </div>

  )

}

export default Home;