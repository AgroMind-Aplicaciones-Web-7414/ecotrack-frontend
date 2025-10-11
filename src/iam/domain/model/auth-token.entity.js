export class AuthToken {
    constructor({ accessToken = '', refreshToken = '' } = {}) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
