<template>
    <UCard class="fixed bottom-0 left-1/2 -translate-x-1/2 shadow-lg mb-2" :ui="{body: '!p-2'}">
        <UNavigationMenu
            :items="routes"
            :ui="{
                root: 'justify-around',
                item: 'py-0',
                link: 'flex-col gap-1 px-3',
                linkLeadingIcon: 'size-5',
                linkLabel: 'text-[10px]/3 font-normal'
            }"
        ></UNavigationMenu>
    </UCard>
</template>

<script setup>
defineProps({
    routes: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>

</style>
