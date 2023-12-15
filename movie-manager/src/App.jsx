import {Box, Container} from "@mui/material";
import Header from "./components/Header.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieFilter from "./components/MovieFilter.jsx";
import React, {useMemo, useState} from "react";
import {useMovies} from "./hooks/useMovies.jsx";


const App = () => {
    const [movies, setMovie] = useState([
        {id: 1, title: "Рататуй", year: "2007", genres: "Ужасы", posterUrl: "src/assets/img.jpg"},
        {id: 2, title: "Во все тяжкие", year: "2008", genres: "Комедия", posterUrl: "src/assets/brackingbad.webp"},
        {id: 3, title: "Рататуй", year: "2007", genres: "Драмма", posterUrl: "src/assets/img.jpg"},
        {id: 4, title: "Во все тяжкие", year: "2008", genres: "Комедия", posterUrl: "src/assets/brackingbad.webp"},
        {id: 5, title: "Голова", year: "2007", genres: "Боевик", posterUrl: "src/assets/img.jpg"},
        {id: 6, title: "Во все тяжкие", year: "2008", genres: "Комедия", posterUrl: "src/assets/brackingbad.webp"},
        {id: 7, title: "Рататуй", year: "2007", genres: "Драмма", posterUrl: "src/assets/img.jpg"},
        {id: 8, title: "Говно", year: "2008", genres: "Мелодрамма", posterUrl: "src/assets/brackingbad.webp"}
    ]);

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedMovies = useMovies(movies, filter.sort, filter.query);

    return (
        <Box>
            <Header/>
            <Container sx={{padding: 3}}>
                <MovieFilter filter={filter} setFilter={setFilter}/>
                <MovieList movies={sortedAndSearchedMovies}/>

            </Container>
        </Box>
    )
}

export default App
