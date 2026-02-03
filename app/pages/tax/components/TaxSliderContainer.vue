<template>
    <UCard variant="soft">
        <ClientOnly>
            <TaxSlider
                v-model:tax-rate="taxRate"
                :tax-rate-min="taxRateMin"
                :tax-rate-max="taxRateMax"
            ></TaxSlider>
        </ClientOnly>

        <table class="mt-8 table-fixed w-full">
            <tbody>
                <tr>
                    <th class="text-xs md:text-base">
                        Tax rate
                    </th>

                    <td class="text-xs md:text-base text-primary font-bold text-end">
                        <span v-if="taxRate === 0">
                            None
                        </span>

                        <span v-else>
                            {{ taxRate }} % after the first 100M$
                        </span>
                    </td>
                </tr>

                <tr>
                    <th class="text-xs md:text-base">
                        Money retrieved
                    </th>

                    <td class="text-primary font-bold text-end text-xs md:text-base">
                        {{ useFormat().currency(moneyRetrievedTotal, 0, 2, 'USD') }}
                    </td>
                </tr>
            </tbody>
        </table>
    </UCard>
</template>

<script setup>
import useFormat from '~/composables/format.js';
import TaxSlider from '~/pages/tax/components/TaxSlider.vue';

const taxRate = defineModel('taxRate', { type: Number });

defineProps({
    taxRateMin: {
        type: Number,
        required: true
    },
    taxRateMax: {
        type: Number,
        required: true
    },
    moneyRetrievedTotal: {
        type: Number,
        required: true
    }
});
</script>

<style scoped>

</style>
