import { reactive } from 'vue';
import { AuthApi } from '../infrastructure/auth-api.js';
import { AuthAssembler } from '../infrastructure/auth.assembler.js';

class UserStore {
    state = reactive({
        loading: false,
        errorKey: null,     // i18n key (p.e. 'auth.invalidCredentials')
        user: null,
        tokens: null
    });

    #api = new AuthApi();
    #assembler = new AuthAssembler();

    async login({ email, password }) {
        this.state.loading = true;
        this.state.errorKey = null;
        try {
            const data = await this.#api.login(email, password);
            this.state.user = this.#assembler.toUser(data.user);
            this.state.tokens = this.#assembler.toTokens(data.tokens);
            return true;
        } catch (err) {
            this.state.errorKey = err?.response?.status === 401
                ? 'auth.invalidCredentials'
                : err?.response?.status === 503
                ? 'common.serviceUnavailable'
                : 'common.unexpectedError';
            return false;
        } finally {
            this.state.loading = false;
        }
    }

    async register({ name, email, password }) {
        this.state.loading = true;
        this.state.errorKey = null;
        try {
            const data = await this.#api.register(name, email, password);
            this.state.user = this.#assembler.toUser(data.user);
            this.state.tokens = this.#assembler.toTokens(data.tokens);
            return true;
        } catch (err) {
            this.state.errorKey = err?.response?.status === 409
                ? 'auth.emailAlreadyExists'
                : 'common.unexpectedError';
            return false;
        } finally {
            this.state.loading = false;
        }
    }

    logout() {
        this.state.user = null;
        this.state.tokens = null;
    }
}

export const userStore = new UserStore();
