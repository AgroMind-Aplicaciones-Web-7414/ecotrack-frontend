import axios from 'axios';

export class AuthApi {
    // Ajusta esta URL cuando tengas backend (o usa .env)
    baseUrl = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:3000';
    http = axios.create({ baseURL: this.baseUrl });

    async login(email, password) {
        // Ejemplo real:
        // const { data } = await this.http.post('/auth/login', { email, password });
        // return data;

        // MOCK para poder probar sin backend
        await new Promise(r => setTimeout(r, 500));
        if (email === 'demo@ecotrack.com' && password === 'Demo123!') {
            return {
                user: { id: 1, name: 'Eco Demo', email },
                tokens: { accessToken: 'mock-access', refreshToken: 'mock-refresh' }
            };
        }
        const err = new Error('Invalid credentials');
        err.response = { status: 401 };
        throw err;
    }
}
