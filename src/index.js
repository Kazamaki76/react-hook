import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Step 1 เก็บ input จาก user จาก react state
// Step 2 handle submit
// Step 3 make HTTP request 
// Step 4 

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjM5NDc2ZTRlYmI4Y2QyNDE4YmJiMDAyYmJkOWExNiIsInN1YiI6IjY0ZjgxNjljOGUyMGM1MGNkODQzYjYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xm8mWIQxkEXjS3736hkQR6vjIN9sI1omhnnvqKQ-M_Q"


function App() {
  const [keyword, setKeyword] = useState("");
  const [movieLists, setMovieLists] = useState([])
  const handleSubmit = async (event) => {
    event.preventDefault();

    let url = `${BASE_URL}/search/keyword?query=${keyword}&page=1`;
    let option = {
      method: "GET",
      headers: {
        accept : "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    try { 
      const response = await fetch(url,option) ;
      const data = await response.json();
      console.log(data);
      const movie = data.result
      setMovieLists(data.results);
    } catch (error) {
      console.log(error);
    };
    console.log("submmited")
  };
  return<div className='App'>
    <div className='header'> 
    <h1>movie app</h1> 
    </div>


    {/* Input */}
  <form className='search' onSubmit={handleSubmit} > 
  <input type="text" placeholder='keyword ?' value={keyword}  onChange={(e) => setKeyword(e.target.value)}/>
  <button>search</button>
  </form>

  {/* {result} */}
  <div className='movie-lists'> 
  {movieLists.map ((event => <div key={event.id}> { event.name }</div> ))}
  
  
   </div>
  </div>
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

