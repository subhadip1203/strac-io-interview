import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AuthTemplate from '../../src/template/AuthTemplate.vue';

describe('AuthTemplate Unit Tests', () => {
    it('renders static content correctly', () => {
        const wrapper = mount(AuthTemplate);

        // Check if the updated static elements are rendered
        expect(wrapper.html()).toContain('<a class="navbar-brand mx-2">Google Drive App</a>');
        expect(wrapper.find('.b-example-divider').exists()).toBe(true);
    });

    it('renders slot content correctly', () => {
        const wrapper = mount(AuthTemplate, {
            slots: {
                default: '<div>Dynamic Page Content</div>', // Provide slot content
            },
        });

        // Check if slot content is rendered inside the template
        expect(wrapper.html()).toContain('Dynamic Page Content');
    });

    it('renders with default slot content if no slot is provided', () => {
        const wrapper = mount(AuthTemplate);

        // Default slot comment should remain if no slot content is provided
        expect(wrapper.html()).toContain('<!-- here autual page body contect will be dynamicallly insert by Vue -->');
    });
});
