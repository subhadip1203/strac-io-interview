<script setup>
</script>

<template>
    <main>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
            <a class="navbar-brand mx-2">Google Drive App</a>
        </nav>

        <div class="b-example-divider"></div>

        <slot>
            <!-- here autual page body contect will be dynamicallly insert by Vue -->
            <!-- Like Dashboard , page 1 or page 1 -->
        </slot>
    </main>
</template>

<style scoped></style>
