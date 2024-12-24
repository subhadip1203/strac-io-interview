<template>
    <div class="d-flex justify-content-center my-4">
        <div>
            <h3 class="my-2">Please provide us the Google Drive access </h3>

            <p> You will be redirected to Google to give us access to your Google drive </p>
            <p> By agreeing on , you are giving us permission to</p>
            <p> <b>Read, Upload , Download , Delete</b> files and foldes of google drive</p>
            <p> You can revoke this permission at any time from your Google account</p>
            <p> We will not store any of your files or data</p>

            <button type="button" class="btn btn-primary my-2" @click="getGoogleAuthURL">Connect to Google
                Drive</button>
        </div>
    </div>
</template>


<script setup>
import axios from 'axios';
import getConfig from '@/config';
const config = getConfig();


async function getGoogleAuthURL() {
    try {
        const response = await axios.get(`${config.backendUrl}/auth`);
        if (response.status === 200 && response.data.url) {
            window.location.href = response.data.url;
        }
    } catch (error) {
        console.error(error);
    }
}

</script>

<style scoped>
button {
    font-weight: bold;
}
</style>
