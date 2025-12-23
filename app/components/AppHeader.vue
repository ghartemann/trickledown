<template>
    <UHeader>
        <template #left>
            <NuxtLink to="/">
                <h1 class="w-auto shrink-0 text-xl text-primary font-semibold"
                    @click="goToHome"
                >
                    TrickleDown.js
                </h1>
            </NuxtLink>
        </template>

        <UNavigationMenu :items="items"></UNavigationMenu>

        <template #right>
            <UColorModeButton variant="ghost"></UColorModeButton>

            <UButton
                @click="showAboutModal = true"
                icon="lucide-info"
                color="neutral"
                variant="ghost"
            ></UButton>
        </template>

        <AboutModal v-model="showAboutModal"></AboutModal>
    </UHeader>
</template>

<script setup>
import AboutModal from '~/components/modals/AboutModal.vue';

const route = useRoute();
const router = useRouter();

const showAboutModal = ref(false);

const items = computed(() => [
    {
        label: 'Real time mode',
        icon: 'i-lucide-timer',
        to: '/real-time',
        active: route.path.startsWith('/real-time')
    },
    {
        label: 'Tax mode',
        icon: 'i-lucide-hand-coins',
        to: '/tax',
        active: route.path.startsWith('/tax')
    },
])

function goToHome() {
    router.push({ name: 'home' });
}
</script>

<style scoped>

</style>
