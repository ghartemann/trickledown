<template>
    <div class="flex flex-col gap-2">
        <h2 class="font-medium">
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

const thingss = useThings().getThings();

const props = defineProps({
    moneyRetrievedTotal: {
        type: Number,
        required: true
    }
});

const things = ref([
    thingss.find((t) => t.slug === 'gaza')
]);

const thingsComputed = computed(() => {
    return things.value.map((t) => {
        return {
            ...t,
            title: t.name,
            value: t.price,
            checked: t.price <= props.moneyRetrievedTotal
        };
    });
});
</script>

<style scoped>

</style>
