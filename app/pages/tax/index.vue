<template>
    <div class="w-full min-h-screen flex flex-col overflow-hidden relative pb-16">
        <AppLoader v-if="loadingBillionaires"></AppLoader>

        <UContainer
            v-else
            class="mt-4 mb-8"
        >
            <TaxSliderContainer
                v-model:tax-rate="taxRate"
                :tax-rate-min="taxRateMin"
                :tax-rate-max="taxRateMax"
                :money-retrieved-total="moneyRetrievedTotal"
                class="my-8 md:w-1/2 mx-auto"
            ></TaxSliderContainer>

            <div class="md:w-1/2 mx-auto grid grid-cols-2 gap-2">
                <BillionairesContainer
                    v-model:money-retrieved="moneyRetrieved"
                    class="col-span-full"
                    :tax-rate="taxRate"
                ></BillionairesContainer>

                <!--                <CouldBuyContainer :money-retrieved-total="moneyRetrievedTotal"></CouldBuyContainer>-->
            </div>
        </UContainer>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import AppLoader from '~/components/AppLoader.vue';
import BillionairesContainer from '~/pages/tax/components/BillionairesContainer.vue';
import TaxSliderContainer from '~/pages/tax/components/TaxSliderContainer.vue';

useBillionairesStore().fetchDataFromApi();
const { billionaires, loadingBillionaires } = storeToRefs(useBillionairesStore());

const taxRate = ref(0);
const taxRateMin = ref(0);
const taxRateMax = ref(100);

const moneyRetrieved = ref([0]);

const moneyRetrievedTotal = computed(() => {
    if (moneyRetrieved.value.length === 0) {
        return 0;
    }

    return moneyRetrieved.value.reduce(
        (accumulator, currentValue) => accumulator + currentValue
    );
});

watch(() => billionaires.value, () => {
    moneyRetrieved.value = billionaires.value.map(() => 0);
});
</script>

<style scoped>

</style>
