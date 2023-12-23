import {Stack, Typography} from "@mui/material";
import MovieList from "../components/MovieList.jsx";
import MovieFilter from "../components/MovieFilter.jsx";
import React, {useEffect, useState} from "react";
import {useMovies} from "../hooks/useMovies.jsx";
import MovieService from "../API/MovieService.js";
import {useFetching} from "../hooks/useFetching.js";
import {getPagesCount} from "../utils/pages.js";
import PagePagination from "../components/PagePagination.jsx";


const Movies = () => {
    const [movies, setMovies] = useState([]);

    const [filter, setFilter] = useState({sort: '', query: ''});


    const [totalPages, setTotalPages] = useState(0);
    const [limit] = useState(25);
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


    const changePage = (event, value) => {
        setPage(value);
    }

    return (
        <>
            <Stack p={3} spacing={1} sx={{paddingX: {xs: 0, md: 3}}}>
                <MovieFilter filter={filter} setFilter={setFilter}/>
                {movieError &&
                    <Typography>Ошибка ${movieError}</Typography>
                }
                <MovieList isMoviesLoading={isMoviesLoading} movies={sortedAndSearchedMovies}/>
                <PagePagination totalPages={totalPages} page={page} changePage={changePage}/>
            </Stack>
        </>

    )
}

export default Movies;
