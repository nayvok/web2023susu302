import axios from "axios";

export default class MovieService {
    static async getAll() {
        try {
            const response = await axios.get('http://192.168.0.129:3000/movies')
            return response.data
        } catch (e) {
            console.log(e);
        }
    }
    static async deleteMovie(movie){
        try{
            const response = await axios.delete(`http://192.168.0.129:3000/movies/${movie}`)
        } catch (e) {
            console.log(e);
        }
    }
}