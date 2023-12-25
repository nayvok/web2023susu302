import {useMemo} from "react";

export const useSortedMovies = (movies, sort) => {
    const sortedMovies = useMemo(() => {
        if (sort) {
            return [...movies].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return movies;
    }, [sort, movies])

    return sortedMovies;
}

export const useMovies = (movies, sort, query, limit, page) => {
    const sortedMovies = useSortedMovies(movies, sort)

    const sortedAndSearchedMovies = useMemo(() => {
        return sortedMovies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())).slice(limit*(page-1), limit*page)
    }, [query, sortedMovies])

    return sortedAndSearchedMovies;
}
