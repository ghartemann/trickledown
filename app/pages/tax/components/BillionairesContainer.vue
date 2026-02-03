<template>
    <div class="flex flex-col gap-2">
        <h2>
            People <ULink @click="scrollToAnchor('#you')">(and you!)</ULink>
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
                {{ useFormat().formatNumberNice((stats.worldPopulation * 0.16) - 100, true) }}
                other people richer than you
            </div>
        </UCard>

        <BillionaireCard
            id="you"
            :billionaire="you"
            :tax-rate="taxRate"
        ></BillionaireCard>

        <UCard>
            <div class="text-center text-dimmed">
                {{ useFormat().formatNumberNice(stats.worldPopulation - (stats.worldPopulation * 0.16) - 100, true) }}
                other people poorer than you
            </div>
        </UCard>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useFormat from '~/composables/format.js';
import BillionaireCard from '~/pages/tax/components/BillionaireCard.vue';
import stats from "~/constants/stats";

const { scrollToAnchor } = useAnchorScroll();

const moneyRetrieved = defineModel('money-retrieved', { type: Array });

defineProps({
    taxRate: {
        type: Number,
        required: true
    }
});

const { billionaires } = storeToRefs(useBillionairesStore());

const you = ref({
    personName: 'You',
    source: 'Nothing much, probably',
    finalWorth: 0.05,
    rank: Math.round(stats.worldPopulation * 0.16),
    estWorthPrev: 0.05
});
</script>

<style scoped>

</style>
