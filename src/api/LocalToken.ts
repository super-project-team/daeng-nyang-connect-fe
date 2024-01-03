class LocalToken {
	private readonly TOKEN_KEY = 'access_token';
	private readonly REFRESH_TOKEN_KEY = 'refresh_token';

	save(token: string, isRefreshToken = false) {
		const key = isRefreshToken ? this.REFRESH_TOKEN_KEY : this.TOKEN_KEY;
		localStorage.setItem(key, token);
	}

	get(isRefreshToken = false) {
		const key = isRefreshToken ? this.REFRESH_TOKEN_KEY : this.TOKEN_KEY;
		return localStorage.getItem(key);
	}

	remove(isRefreshToken = false) {
		const key = isRefreshToken ? this.REFRESH_TOKEN_KEY : this.TOKEN_KEY;
		localStorage.removeItem(key);
	}

	isTokenExpired(): boolean {
		const token = this.get();
		if (!token) return true;

		try {
			const payload = JSON.parse(atob(token.split('.')[1]));
			const now = Date.now() / 1000;
			console.log('payload.exp', payload.exp);
			return now > payload.exp;
		} catch (e) {
			console.error('Error checking token expiration:', e);
			return true;
		}
	}
}

const localToken = new LocalToken();

export default localToken;
