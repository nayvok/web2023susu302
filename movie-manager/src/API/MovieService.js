import axios from "axios";

export default class MovieService {
    static async getAll() {
        return await axios.get('http://192.168.0.129:3000/movies');
    }

    static async getTotalCount(limit= 25, page = 1) {
        const response = await axios.get('http://192.168.0.129:3000/movies', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response.headers['x-total-count'];
    }

    static async deleteMovie(movie) {
        await axios.delete(`http://192.168.0.129:3000/movies/${movie}`)
    }

    static async getById(id) {
        return await axios.get(`http://192.168.0.129:3000/movies/${id}`);
    }
}