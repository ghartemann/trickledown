<template>
    <div class="flex flex-col gap-2">
        <h2>
            Things this money could buy
        </h2>

        <UCard
            v-for="(thing, i) in thingsComputed"
            :key="i"
        >
            <UCheckbox
                :model-value="thing.checked"
                :label="thing.title"
                :description="useFormat().currency(thing.value, 0, 0, 'USD')"
                class="pointer-events-none"
            ></UCheckbox>
        </UCard>
    </div>
</template>

<script setup>
import useFormat from '~/composables/format.js';

const props = defineProps({
    moneyRetrievedTotal: {
        type: Number,
        required: true
    }
});

const things = ref([
    {
        title: 'Rebuilding Gaza',
        value: 53.2
    },
    {
        title: 'Sécurité Sociale budget 2025',
        value: 666
    }
]);

const thingsComputed = computed(() => {
    return things.value.map((t) => {
        return {
            ...t,
            value: t.value * 1000000000,
            checked: t.value * 1000000000 <= props.moneyRetrievedTotal
        };
    });
});
</script>

<style scoped>

</style>
