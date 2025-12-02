import axios from '../lib/axios';
import type { LoginUser } from '@/interfaces/services/login-user.interface';

export const authService = {
  login(credentials: LoginUser) {
    return axios.post(`/auth/login`, credentials);
  },
};
