<template>
    <UApp>
        <AppHeader :routes="routes"></AppHeader>

        <NuxtPage></NuxtPage>

        <USeparator></USeparator>

        <AppFooter></AppFooter>

        <AppFloatingMenu :routes="routes" class="md:hidden"></AppFloatingMenu>
    </UApp>
</template>

<script setup>
import AppFloatingMenu from '~/components/AppFloatingMenu.vue';
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

const route = useRoute();

const routes = computed(() => [
    {
        label: 'Real time trickledown',
        icon: 'i-lucide-timer',
        to: '/real-time',
        active: route.path.startsWith('/real-time')
    },
    {
        label: 'Tax Simulator 2027',
        icon: 'i-lucide-hand-coins',
        to: '/tax',
        active: route.path.startsWith('/tax')
    },
    {
        label: 'Life expectancy',
        icon: 'i-lucide-heart-pulse',
        to: '/life-expectancy',
        active: route.path.startsWith('/life-expectancy')
    }
]);
</script>
