// Integration Test: Authentication API

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import AuthHome from '@/views/AuthView/AuthHome.vue';

// Mock Axios for API calls
vi.mock('axios');

// Mock getConfig to return a backendUrl
vi.mock('@/config', () => ({
    default: vi.fn(() => ({ backendUrl: 'http://localhost:5000' })),
}));

describe('Authentication API', () => {
    it('retrieves the Google callback URL when accessing /auth', async () => {
        const mockResponse = {
            status: 200,
            data: { url: 'https://accounts.google.com/o/oauth2/v2/auth' },
        };
        axios.get.mockResolvedValueOnce(mockResponse);

        // Mock window.location.href
        const originalLocation = window.location;
        delete window.location; // Remove default implementation
        window.location = { href: vi.fn() }; // Mock window.location.href

        const wrapper = mount(AuthHome);
        await wrapper.find('button').trigger('click');

        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/auth');
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(window.location.href).toBe(mockResponse.data.url);

        // Restore original window.location
        window.location = originalLocation;
    });
});
