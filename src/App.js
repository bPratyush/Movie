import './App.css';
import React, { useState, useEffect } from 'react'
import api from './api/axiosConfig';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
      setLoading(false); // Set loading to false when data is fetched successfully
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false); // Set loading to false when an error occurs
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies}/>} />
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}>
            </Route>
        </Route>
      </Routes>
    </div>
  );
  

}

export default App;
