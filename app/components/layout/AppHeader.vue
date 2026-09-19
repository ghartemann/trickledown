<template>
    <UHeader :toggle="false">
        <template #left>
            <div class="flex items-center gap-8">
                <NuxtLink to="/">
                    <h1
                        class="w-auto shrink-0 text-xl text-primary font-semibold"
                        @click="goHome"
                    >
                        TrickleDown.js
                    </h1>
                </NuxtLink>

                <UNavigationMenu
                    :items="routes"
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
    </UHeader>
</template>

<script setup>
import AboutModal from '~/components/modals/AboutModal.vue';

const router = useRouter();

defineProps({
    routes: {
        type: Array,
        required: true
    }
});

const showAboutModal = ref(false);

function goHome() {
    router.push({ name: '' });
}
</script>

<style scoped>

</style>
