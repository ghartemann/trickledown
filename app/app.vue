<template>
    <UApp>
        <AppHeader></AppHeader>

        <NuxtPage></NuxtPage>

        <USeparator></USeparator>

        <AppFooter></AppFooter>
    </UApp>
</template>

<script setup>
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
</script>
