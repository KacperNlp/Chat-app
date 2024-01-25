import axios from "axios";
import type { LoginForm, RegisterForm } from '@/types/types';

export default abstract class UserManager {
    static async registerUser(userData: RegisterForm) {
        const config = useRuntimeConfig();
        const newUser = {...userData, role: 'user'}
        return await axios.post(`${config.public.apiURL}/user/register`, newUser);
    }

    static async loginUser(userData: LoginForm) {
        const config = useRuntimeConfig();
        return await axios.post(`${config.public.apiURL}/user/login`, userData);
    }

    static async getUserProfileInfo(userId: string) {
        const config = useRuntimeConfig();
        return await axios.get(`${config.public.apiURL}/user`)
    }
}
