<template>
    <h3>Wait we are verifying </h3>

</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
import getConfig from '@/config';
const config = getConfig();

import { useRouter } from "vue-router";
const router = useRouter();

import { useAuthStore } from "@/stores/auth_store";
const authStore = useAuthStore();


onMounted(async () => {
    try {
        const queryString = window.location.search;
        const response = await axios.get(`${config.backendUrl}/auth/callback${queryString}`, { withCredentials: true });
        console.log(response.data);
        if (response.status === 200 && response.data.message === 'Authentication successful') {
            const { access_token, expiry_date } = response.data.tokens;
            console.log(access_token, expiry_date);
            const status = authStore.handleLogin(access_token, expiry_date);
            if (status) {
                router.push({ name: "Dashboard" });
            } else {
                router.push({ name: "AuthHome" });
            }
        }
    } catch (error) {
        console.error(error);
    }

});


</script>

<style scoped>
button {
    font-weight: bold;
}
</style>
