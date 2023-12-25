import {Fab, Stack, Typography} from "@mui/material";
import MovieList from "../components/MovieList.jsx";
import MovieFilter from "../components/MovieFilter.jsx";
import React, {useEffect, useState} from "react";
import {useMovies} from "../hooks/useMovies.jsx";
import MovieService from "../API/MovieService.js";
import {useFetching} from "../hooks/useFetching.js";
import {getPagesCount} from "../utils/pages.js";
import PagePagination from "../components/PagePagination.jsx";
import AddIcon from "@mui/icons-material/Add";
import EditAndCreateDialog from "../components/EditAndCreateDialog.jsx";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    const [filter, setFilter] = useState({sort: '', query: ''});


    const [totalPages, setTotalPages] = useState(0);
    const [limit] = useState(25);
    const [page, setPage] = useState(1);

    const [openCreate, setOpenCreate] = useState(false);

    const [inputs, setInputs] = useState({
        title: "",
        year: 0,
        runtime: 0,
        director: "",
        actors: "",
        plot: "",
        genres: [],
        posterUrl: ""
    })

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

    async function createMovie() {
        const newMovie = {
            id: Date.now(),
            title: inputs.title,
            year: inputs.year,
            runtime: inputs.runtime,
            director: inputs.director,
            actors: inputs.actors,
            plot: inputs.plot,
            genres: inputs.genres,
            posterUrl: inputs.posterUrl

        }
        await MovieService.createMovie(newMovie);
        fetchMovies();
        setOpenCreate(false);
    }

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }
    const handleClose = () => {
        setOpenCreate(false);
    };

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
            <Fab color="primary" aria-label="add" sx={{position: "fixed", bottom: "20px", right: "20px"}} onClick={handleClickOpenCreate}>
                <AddIcon />
            </Fab>
            <EditAndCreateDialog openDialog={openCreate} editMovie={createMovie} handleClose={handleClose} setInputs={setInputs} movie={inputs} inputs={inputs}/>
        </>

    )
}

export default Movies;
