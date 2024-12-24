<script setup>
import { RouterView } from 'vue-router'
import LayoutController from '@/template/LayoutController.vue'
// console.log("okokok")
// console.log(import.meta.env.VITE_ENVIRON);
// console.log("okokok2")
</script>

<template>
    <div class="container">
        <LayoutController>
            <RouterView />
        </LayoutController>
    </div>
</template>

<style scoped></style>
