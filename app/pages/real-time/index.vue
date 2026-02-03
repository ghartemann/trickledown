<template>
    <div class="w-full min-h-screen flex flex-col overflow-hidden relative pb-16">
        <AppLoader v-if="loading"></AppLoader>

        <template v-else>
            <MoneyMakersEnabled
                v-model="selectedTimeTab"
                :money-makers="moneyMakers.filter((mm) => mm.displayed)"
                :time-elapsed="timeElapsed"
                class="max-w-full mx-auto"
            ></MoneyMakersEnabled>

            <UContainer class="mt-4 mb-8">
                <MoneyMakersDisabled
                    v-model="selectedTimeTab"
                    :money-makers="moneyMakers.filter((mm) => !mm.displayed)"
                ></MoneyMakersDisabled>
            </UContainer>
        </template>
    </div>
</template>

<script setup>
import { useIntervalFn } from '@vueuse/core';
import AppLoader from '~/components/AppLoader.vue';
import useThings from '~/composables/useThings.js';
import wagesData from '~/constants/wagesData.ts';
import MoneyMakersDisabled from '~/pages/real-time/components/MoneyMakersDisabled.vue';
import MoneyMakersEnabled from '~/pages/real-time/components/MoneyMakersEnabled.vue';

const rate = ref(32); // ~60fps
const timeElapsed = ref(0);
const lastUpdateTime = ref(Date.now());
const selectedTimeTab = ref('fulltime');

const things = ref(useThings().getThings());
const moneyMakers = ref([]);

const loading = computed(() => moneyMakers.value.length === 0);

const { pause, resume } = useIntervalFn(() => {
    update();
}, rate, { immediate: false });

onMounted(() => {
    initMoneyMakers();
    resume();
});

onUnmounted(() => {
    pause();
});

function initMoneyMakers() {
    const mm = [];

    wagesData.forEach(moneyMaker => {
        mm.push({
            ...moneyMaker,
            money: 0,
            things: things.value.reduce((acc, thing) => {
                const baseHours = thing.price / moneyMaker.hourlyWage;

                acc[thing.slug] = {
                    owned: 0,
                    timeItLlTake: baseHours,
                    timeItLlTakePartTime: (() => {
                        const workingDays = Math.floor(baseHours / 8);
                        const remainingHours = baseHours % 8;
                        const weeks = Math.floor(workingDays / 5);
                        const remainingDays = workingDays % 5;
                        return (weeks * 7 * 24) + (remainingDays * 24) + remainingHours;
                    })()
                };

                return acc;
            }, {})
        });
    });

    moneyMakers.value = mm;
}

function update() {
    const now = Date.now();
    const delta = (now - lastUpdateTime.value) / 1000;
    lastUpdateTime.value = now;

    timeElapsed.value += delta;

    const increment = delta / 3600;

    moneyMakers.value.forEach(moneyMaker => {
        moneyMaker.money += moneyMaker.hourlyWage * increment;

        things.value.forEach(thing => {
            moneyMaker.things[thing.slug].owned = Math.floor(moneyMaker.money / thing.price);
        });
    });
}
</script>

<style scoped>

</style>
