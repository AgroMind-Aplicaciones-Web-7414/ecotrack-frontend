import axios from 'axios';

export class AuthApi {
    baseUrl = import.meta.env.VITE_API_BASE_URL;
    usersEndpoint = import.meta.env.VITE_USERS_ENDPOINT;
    http = axios.create({ baseURL: this.baseUrl });

    async login(email, password) {
        try {
            // Obtener todos los usuarios
            const { data: users } = await this.http.get(this.usersEndpoint);

            // Buscar usuario que coincida con email y password
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                const err = new Error('Invalid credentials');
                err.response = { status: 401 };
                throw err;
            }

            // Simular tokens JWT (en un backend real se generarían)
            return {
                user: { id: user.id, name: user.name, email: user.email },
                tokens: {
                    accessToken: `jwt-token-${user.id}`,
                    refreshToken: `refresh-token-${user.id}`
                }
            };
        } catch (error) {
            if (error.response?.status === 401) {
                throw error;
            }
            // Si no es error 401, puede ser error de conexión
            const err = new Error('Service unavailable');
            err.response = { status: 503 };
            throw err;
        }
    }

    async register(name, email, password) {
        try {
            // Verificar si el email ya existe
            const { data: users } = await this.http.get(this.usersEndpoint);
            const existingUser = users.find(u => u.email === email);

            if (existingUser) {
                const err = new Error('Email already exists');
                err.response = { status: 409 };
                throw err;
            }

            // Crear nuevo usuario
            const newUser = {
                id: String(Date.now()), // ID simple basado en timestamp
                name,
                email,
                password
            };

            const { data: createdUser } = await this.http.post(this.usersEndpoint, newUser);

            return {
                user: { id: createdUser.id, name: createdUser.name, email: createdUser.email },
                tokens: {
                    accessToken: `jwt-token-${createdUser.id}`,
                    refreshToken: `refresh-token-${createdUser.id}`
                }
            };
        } catch (error) {
            if (error.response?.status === 409) {
                throw error;
            }
            const err = new Error('Registration failed');
            err.response = { status: 500 };
            throw err;
        }
    }
}
