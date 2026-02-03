<template>
    <UApp>
        <AppHeader></AppHeader>

        <NuxtPage></NuxtPage>

        <USeparator></USeparator>

        <AppFooter></AppFooter>
    </UApp>
</template>

<script setup>
import AppFooter from '~/components/layout/AppFooter.vue';
import AppHeader from '~/components/layout/AppHeader.vue';

const meta = {
    title: 'TrickleDown.js',
    description: 'How long would it take you to buy a 65 m Yacht? What about Elon Musk?',
    image: 'https://trickledown.ghartemann.fr/3d-money.jpg',
    url: 'https://trickledown.ghartemann.fr/'
};

useSeoMeta({
    description: meta.description,
    ogTitle: meta.title,
    ogDescription: meta.description,
    ogImage: meta.image,
    ogUrl: meta.url,
    twitterTitle: meta.title,
    twitterDescription: meta.description,
    twitterImage: meta.image,
    twitterCard: 'summary'
});

useHead({
    link: [
        { rel: 'canonical', href: meta.url }
    ]
});
</script>
