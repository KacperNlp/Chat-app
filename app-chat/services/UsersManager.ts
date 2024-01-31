import axios from "axios";

export default abstract class UsersManager {
    static async getAllUsers() {
        const config = useRuntimeConfig();
        return await axios.get(`${config.public.apiURL}/user/all`)
    }
}
