<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/template/DefaultTemplate.vue'
import AuthTemplate from '@/template/AuthTemplate.vue'

// this variable is used to save if any template is used
const templateName = ref('')

const route = useRoute()

// watch the route meta and set the templateName variable
// route meta details availble in @/router/index
watch(
    () => route.meta?.layout,
    metaLayout => {
        templateName.value = metaLayout
    }
)
</script>

<template>
    <!-- for  auth-template in routes , show  AuthTemplate  -->
    <!--  check @/router/index for meta property in routes -->

    <template v-if="templateName == 'auth-template'">
        <AuthTemplate>
            <RouterView />
        </AuthTemplate>
    </template>
    <template v-else>
        <DefaultLayout>
            <RouterView />
        </DefaultLayout>
    </template>
</template>
