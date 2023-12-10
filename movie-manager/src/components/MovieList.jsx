import React from 'react';
import {Grid} from "@mui/material";
import MovieItem from "./MovieItem.jsx";

const MovieList = ({posts}) => {
    return (
        <Grid container spacing={5} sx={{paddingTop: 5}}>
            {posts.map(post =>
                <MovieItem post={post} key={post.id}/>
            )}

        </Grid>
    );
};

export default MovieList;