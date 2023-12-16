import {Box, Button, CircularProgress, Container, Pagination, Stack, Typography} from "@mui/material";
import Header from "./components/Header.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieFilter from "./components/MovieFilter.jsx";
import React, {useEffect, useState} from "react";
import {useMovies} from "./hooks/useMovies.jsx";
import axios from "axios";
import MovieService from "./API/MovieService.js";
import Loader from "./components/Loader.jsx";
import {useFetching} from "./hooks/useFetching.js";
import {getPagesCount} from "./utils/pages.js";
import PagePagination from "./components/PagePagination.jsx";


const App = () => {
    const [movies, setMovies] = useState([]);

    const [filter, setFilter] = useState({sort: '', query: ''});


    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(25);
    const [page, setPage] = useState(1);

    const [fetchMovies, isMoviesLoading, movieError] = useFetching(async () => {
        const response = await MovieService.getAll();
        setMovies(response.data);
        const totalCount = await MovieService.getTotalCount();
        setTotalPages(getPagesCount(totalCount, limit));
    })
    const sortedAndSearchedMovies = useMovies(movies, filter.sort, filter.query, limit, page);

    useEffect(() => {
        fetchMovies();
    }, [page]);


    async function removeMovie(movie) {
        setMovies(movies.filter(m => m.id !== movie.id));
        await MovieService.deleteMovie(movie.id);
    }


    const changePage = (event, value) => {
        setPage(value);
    }

    return (
        <>
            <Header/>
            <Container maxWidth={"lg"}>
                <Stack p={3} spacing={1} sx={{paddingX: {xs: 0, md: 3}}}>
                    <MovieFilter filter={filter} setFilter={setFilter}/>
                    {movieError &&
                        <Typography>Ошибка ${movieError}</Typography>
                    }
                    <MovieList isMoviesLoading={isMoviesLoading} remove={removeMovie} movies={sortedAndSearchedMovies}/>
                    <PagePagination totalPages={totalPages} page={page} changePage={changePage}/>
                </Stack>
            </Container>

        </>

    )
}

export default App;
