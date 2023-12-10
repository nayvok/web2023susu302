import {Box, Container} from "@mui/material";
import Header from "./components/Header.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieFilter from "./components/MovieFilter.jsx";
import React, {useState} from "react";


const App = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: "Рататуй", year: "2007", genres: "Комедия", posterUrl: "src/assets/img.jpg"},
        {id: 2, title: "Во все тяжкие", year: "2008", genres: "Комедия", posterUrl: "src/assets/brackingbad.webp"},
        {id: 3, title: "Рататуй", year: "2007", genres: "Комедия", posterUrl: "src/assets/img.jpg"},
        {id: 4, title: "о все тяжкие", year: "2008", genres: "Комедия", posterUrl: "src/assets/brackingbad.webp"},
        {id: 5, title: "Рататуй", year: "2007", genres: "Комедия", posterUrl: "src/assets/img.jpg"},
        {id: 6, title: "Во все тяжкие", year: "2008", genres: "Комедия", posterUrl: "src/assets/brackingbad.webp"},
        {id: 7, title: "Рататуй", year: "2007", genres: "Комедия", posterUrl: "src/assets/img.jpg"},
        {id: 8, title: "Во все тяжкие", year: "2008", genres: "Комедия", posterUrl: "src/assets/brackingbad.webp"}
    ])

    const [selectedSort, setSelectedSort] = useState('')

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    }


    return (
        <Box>
            <Header/>
            <Container sx={{padding: 3}}>
                <MovieFilter
                    value={selectedSort}
                    onChange={sortPosts}
                    options={[
                        {value: 'year', name: 'По дате'},
                        {value: 'title', name: 'По названию'}
                    ]}
                />
                <MovieList posts={posts}/>
            </Container>
        </Box>
    )
}

export default App
