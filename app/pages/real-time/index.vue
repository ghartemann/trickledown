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
import AppLoader from '~/components/AppLoader.vue';
import useThings from '~/composables/useThings.js';
import wagesData from '~/constants/wagesData.ts';
import MoneyMakersDisabled from '~/pages/real-time/components/MoneyMakersDisabled.vue';
import MoneyMakersEnabled from '~/pages/real-time/components/MoneyMakersEnabled.vue';

const rate = ref(10);
const timeElapsed = ref(0); // in seconds
const lastUpdateTime = ref(Date.now());
const animationFrameId = ref(null);

const selectedTimeTab = ref('fulltime');

const things = ref(useThings().getThings());
const moneyMakers = ref([]);

const loading = computed(() => moneyMakers.value.length === 0);

onMounted(() => {
    initMoneyMakers();
    startAnimation();
});

onUnmounted(() => {
    if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value);
    }
});

function startAnimation() {
    let lastFrameTime = performance.now();

    function animate(currentTime) {
        const deltaTime = currentTime - lastFrameTime;

        // Only update if enough time has passed (based on rate)
        if (deltaTime >= rate.value) {
            update();
            lastFrameTime = currentTime;
        }

        animationFrameId.value = requestAnimationFrame(animate);
    }

    animationFrameId.value = requestAnimationFrame(animate);
}

function initMoneyMakers() {
    loading.value = true;

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
                        // Calculate working days (8 hours per day)
                        const workingDays = Math.floor(baseHours / 8);
                        // Remaining working hours
                        const remainingHours = baseHours % 8;

                        // Convert working days to weeks (5 days per week)
                        const weeks = Math.floor(workingDays / 5);
                        // Remaining working days
                        const remainingDays = workingDays % 5;

                        // Convert back to hours
                        return (weeks * 7 * 24) + (remainingDays * 24) + remainingHours;
                    })()
                };

                return acc;
            }, {})
        });
    });

    moneyMakers.value = mm;
    loading.value = false;
}

function update() {
    const now = Date.now();
    const delta = (now - lastUpdateTime.value) / 1000; // delta en secondes
    lastUpdateTime.value = now;

    timeElapsed.value += delta;

    moneyMakers.value.forEach(moneyMaker => {
        moneyMaker.money += (moneyMaker.hourlyWage / 3600) * delta;

        things.value.forEach(thing => {
            moneyMaker.things[thing.slug].owned = Math.floor(moneyMaker.money / thing.price);
        });
    });
}
</script>

<style scoped>

</style>
