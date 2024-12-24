import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import DashboardView from '../../src/views/Home/DashboardView.vue';

describe('DashboardView Unit Tests', () => {
    let router;

    beforeEach(() => {
        // Mock Vue Router
        router = createRouter({
            history: createWebHistory(),
            routes: [
                { path: '/google-drive/:id', name: 'GoogleDriveFolderView', component: { template: '<div>Google Drive</div>' } },
            ],
        });
    });

    it('should render the "Drive view" button', () => {
        const wrapper = mount(DashboardView, {
            global: {
                plugins: [router],
            },
        });

        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Drive view');
    });

    it('should redirect to GoogleDriveFolderView when the button is clicked', async () => {
        const pushMock = vi.spyOn(router, 'push');
        const wrapper = mount(DashboardView, {
            global: {
                plugins: [router],
            },
        });

        const button = wrapper.find('button');
        await button.trigger('click');

        expect(pushMock).toHaveBeenCalledWith({ name: 'GoogleDriveFolderView', params: { id: 'root' } });
    });
});
