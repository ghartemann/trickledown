<template>
    <div class="w-full min-h-screen flex flex-col overflow-hidden relative pb-16">
        <AppLoader v-if="loading"></AppLoader>

        <UContainer
            v-else
            class="mt-4 mb-8"
        >
            test
        </UContainer>
    </div>
</template>

<script setup>
import AppLoader from '~/components/AppLoader.vue';

const loading = ref(false);
</script>

<style scoped>

</style>
