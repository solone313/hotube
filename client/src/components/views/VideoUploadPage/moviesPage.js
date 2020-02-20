import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Card, Avatar, Col, Typography, Row } from 'antd';
function MoviesPage() {

    const [movies, setmovies] = useState([])

    useEffect(() => {
        Axios.get('/api/users/movies')
            .then(response => {
                console.log(response.data);
                setmovies(response.data)
            })
    }, [])
    const movieList = movies.map(movie => {
                
        return <div key={movie.id}><p id={movie.id}>{movie.title}</p>
            <br/><br/>
            <p id={movie.id}>{movie.genres}</p>
            <br/><br/>
            </div>
        
    })
    console.log(movieList,'dkdisahgad')
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'} }>
               
            {movieList}

        </div>
    )
}

export default MoviesPage