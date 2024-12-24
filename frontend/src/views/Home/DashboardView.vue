<template>
    <div class="d-flex justify-content-center my-2">
        <div>
            <button type="button" class="btn btn-primary" @click="driveView">Drive view</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();


async function driveView(folderId) {
    console.log('Redirecting to folder:', folderId);
    router.push({ name: "GoogleDriveFolderView", params: { id: 'root' } });
}

</script>

<style scoped>
button {
    font-weight: bold;
}
</style>
