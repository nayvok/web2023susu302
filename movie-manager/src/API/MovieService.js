import axios from "axios";

export default class MovieService {
    static async getAll() {
        return await axios.get('http://localhost:3000/movies');
    }

    static async getTotalCount(limit= 25, page = 1) {
        const response = await axios.get('http://localhost:3000/movies', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response.headers['x-total-count'];
    }

    static async deleteMovie(movie) {
        await axios.delete(`http://localhost:3000/movies/${movie}`)
    }

    static async editMovie(id, data) {
        await axios.patch(`http://localhost:3000/movies/${id}`, {
            title: data.title,
            year: data.year,
            runtime: data.runtime,
            director: data.director,
            actors: data.actors,
            plot: data.plot,
            genres: data.genres,
            posterUrl: data.posterUrl
        })
    }

    static async createMovie(data) {
        await axios.post(`http://localhost:3000/movies`, {
            id: data.id,
            title: data.title,
            year: data.year,
            runtime: data.runtime,
            director: data.director,
            actors: data.actors,
            plot: data.plot,
            genres: data.genres,
            posterUrl: data.posterUrl
        })
    }


    static async getById(id) {
        return await axios.get(`http://localhost:3000/movies/${id}`);
    }
}