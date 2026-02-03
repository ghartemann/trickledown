<template>
    <UHeader>
        <template #left>
            <div class="flex items-center gap-8">
                <NuxtLink to="/">
                    <h1
                        class="w-auto shrink-0 text-xl text-primary font-semibold"
                        @click="goToHome"
                    >
                        TrickleDown.js
                    </h1>
                </NuxtLink>

                <UNavigationMenu
                    :items="items"
                    class="hidden md:block"
                ></UNavigationMenu>
            </div>
        </template>

        <template #right>
            <UColorModeButton variant="ghost"></UColorModeButton>

            <UButton
                icon="lucide-info"
                color="neutral"
                variant="ghost"
                @click="showAboutModal = true"
            ></UButton>
        </template>

        <AboutModal v-model="showAboutModal"></AboutModal>

        <template #body>
            <UNavigationMenu
                :items="items"
                orientation="vertical"
                class="-mx-2.5"
            ></UNavigationMenu>
        </template>
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
    }
]);

function goToHome() {
    router.push({ name: 'home' });
}
</script>

<style scoped>

</style>
