<template>
    <UCard>
        <template #header>
            <div class="w-full flex justify-between items-center">
                <div class="flex gap-4 items-center">
                    <div
                        :class="billionaire.rank > 100 ? 'w-fit' : 'w-6'"
                        class="text-sm text-dimmed"
                    >
                        #{{ useFormat().formatNumberNice(billionaire.rank, true) }}
                    </div>

                    <UUser
                        :name="billionaire.personName"
                        :description="billionaire.source"
                        :avatar="{ src: billionaire.squareImage }"
                    ></UUser>
                </div>

                <UTooltip text="Reflects change since 5 pm ET of prior trading day.">
                    <UBadge
                        v-if="variation === 0"
                        color="info"
                    >
                        =
                    </UBadge>

                    <div
                        v-else
                        class="flex gap-2"
                    >
                        <UBadge
                            :color="variation > 0 ? 'error' : 'success'"
                            :icon="variation > 0 ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
                            class="hidden md:block "
                        >
                            {{ useFormat().currency(Math.abs(variation), 0, 0, 'USD') }}
                        </UBadge>

                        <UBadge
                            :color="variation > 0 ? 'error' : 'success'"
                            :icon="variation > 0 ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
                        >
                            {{ useFormat().formatNumberNice(variationPercentage, true, 0, 2) }}%
                        </UBadge>
                    </div>
                </UTooltip>
            </div>
        </template>

        <table class="w-full table-fixed text-sm">
            <tbody>
                <tr>
                    <td class="pr-4">
                        Net worth
                    </td>

                    <td class="text-error font-bold text-end">
                        {{ useFormat().currency(netWorth, 0, 2, 'USD') }}
                    </td>
                </tr>

                <tr>
                    <td class="pr-4 pb-2">
                        Tax
                    </td>

                    <td class="text-success font-bold pb-2 text-end">
                        {{ useFormat().currency(tax, 0, 2, 'USD') }}
                    </td>
                </tr>

                <tr>
                    <td class="pr-4 border-t pt-2 border-t-neutral">
                        Net worth after tax
                    </td>

                    <td class="text-error font-bold border-t pt-2 text-end">
                        {{ useFormat().currency(netWorthAfterTax, 0, 2, 'USD') }}
                    </td>
                </tr>
            </tbody>
        </table>
    </UCard>
</template>

<script setup>
import useFormat from '~/composables/format.js';

const moneyRetrieved = defineModel({ type: Number });

const props = defineProps({
    billionaire: {
        type: Object,
        required: true
    },
    taxRate: {
        type: Number,
        required: true
    }
});

const taxRatePercentage = computed(() => {
    return props.taxRate / 100;
});

const netWorth = computed(() => {
    return props.billionaire.finalWorth * 1000000;
});

const tax = computed(() => {
    const taxableWealth = Math.max(0, netWorth.value - 100000000);

    return taxableWealth * taxRatePercentage.value;
});

const netWorthAfterTax = computed(() => {
    return netWorth.value - tax.value;
});

const variation = computed(() => {
    const v = (props.billionaire.finalWorth - (Math.round(props.billionaire.estWorthPrev * 1000) / 1000)) * 1000000;

    if (v < 1000000) {
        return 0;
    }

    return v;
});

const variationPercentage = computed(() => {
    const prev = props.billionaire.estWorthPrev;

    if (!prev) {
        return 0;
    }

    return ((props.billionaire.finalWorth - prev) / prev) * 100;
});

watch(() => netWorthAfterTax.value, () => {
    moneyRetrieved.value = tax.value;
});
</script>

<style scoped>

</style>
