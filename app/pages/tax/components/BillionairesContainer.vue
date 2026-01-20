<template>
    <div class="flex flex-col gap-2">
        <h2>
            People
        </h2>

        <BillionaireCard
            v-for="(billionaire, index) in billionaires"
            :key="billionaire.uri"
            v-model="moneyRetrieved[index]"
            :billionaire="billionaire"
            :tax-rate="taxRate"
        ></BillionaireCard>

        <UCard>
            <div class="text-center text-dimmed">
                {{ useFormat().formatNumberNice((worldPopulation * 0.19) - 100, true) }}
                other people richer than you
            </div>
        </UCard>

        <BillionaireCard
            :billionaire="you"
            :tax-rate="taxRate"
        ></BillionaireCard>

        <UCard>
            <div class="text-center text-dimmed">
                {{ useFormat().formatNumberNice(worldPopulation - (worldPopulation * 0.19) - 100, true) }}
                other people poorer than you
            </div>
        </UCard>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useFormat from '~/composables/format.js';
import BillionaireCard from '~/pages/tax/components/BillionaireCard.vue';

const moneyRetrieved = defineModel('money-retrieved', { type: Array });

defineProps({
    taxRate: {
        type: Number,
        required: true
    }
});

const { billionaires } = storeToRefs(useBillionairesStore());

const worldPopulation = ref(8265492330);

const you = ref({
    personName: 'You',
    finalWorth: 0.01,
    rank: Math.round(worldPopulation.value * 0.19),
    estWorthPrev: 0.01
});
</script>

<style scoped>

</style>
