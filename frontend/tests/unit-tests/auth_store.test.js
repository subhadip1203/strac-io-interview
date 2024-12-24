import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '../../src/stores/auth_store';


vi.mock('vue-router', () => ({
    useRouter: vi.fn(),
}));

describe('AuthStore Unit Tests', () => {
    let authStore;

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
        authStore = useAuthStore();
    });

    it('should initialize with default values', () => {
        expect(authStore.isAuthenticated).toBe(false);
        expect(authStore.token).toBe('');
        expect(authStore.expiresAt).toBe(0);
    });

    describe('handleLogin', () => {
        it('should set token, expiry date, and authenticate the user on successful login', () => {
            const token = 'test-token';
            const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now

            const result = authStore.handleLogin(token, expiresAt);

            expect(result).toBe(true);
            expect(authStore.isAuthenticated).toBe(true);
            expect(authStore.token).toBe(token);
            expect(authStore.expiresAt).toBe(expiresAt);
        });

        it('should fail login when token or expiry date is missing', () => {
            const result = authStore.handleLogin('', 0);

            expect(result).toBe(false);
            expect(authStore.isAuthenticated).toBe(false);
            expect(authStore.token).toBe('');
            expect(authStore.expiresAt).toBe(0);
        });

        it('should fail login when expiry date is invalid', () => {
            const result = authStore.handleLogin('test-token', 'invalid-date');

            expect(result).toBe(false);
            expect(authStore.isAuthenticated).toBe(false);
            expect(authStore.token).toBe('');
            expect(authStore.expiresAt).toBe(0);
        });
    });

    describe('logout', () => {
        it('should clear token, expiry date, and unauthenticate the user on logout', () => {
            authStore.handleLogin('test-token', Date.now() + 60 * 60 * 1000);
            authStore.logout();

            expect(authStore.isAuthenticated).toBe(false);
            expect(authStore.token).toBe('');
            expect(authStore.expiresAt).toBe(0);
        });
    });
});
