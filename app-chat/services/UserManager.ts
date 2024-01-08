import axios from "axios";
import type { RegisterForm } from '@/types/types';

export default abstract class UserManager {
    static async registerUser(userData: RegisterForm) {
        const config = useRuntimeConfig();
        const newUser = {...userData, role: 'user'}
        return await axios.post(`${config.public.apiURL}/user/register`, newUser);
    }
}
