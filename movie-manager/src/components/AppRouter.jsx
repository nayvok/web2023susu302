import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Movies from "../pages/Movies.jsx";
import MovieDetails from "../pages/MovieDetails.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route exact path={"/movies"} element={<Movies/>}/>
            <Route exact path={"/movies/:id"} element={<MovieDetails/>}/>
            <Route path="*" element={<Navigate replace to="/movies"/>} />
        </Routes>
    );
};

export default AppRouter;