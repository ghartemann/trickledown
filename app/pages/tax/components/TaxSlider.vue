<template>
    <div>
        <USlider
            v-model="taxRate"
            :min="taxRateMin"
            :max="taxRateMax"
            label="Adjust tax rate"
        ></USlider>

        <div class="relative mt-1.5">
            <div
                v-for="(step, index) in stepper"
                :key="index"
                class="absolute text-[10px] md:text-xs text-dimmed"
                :style="{ left: `calc(${step}% * 0.97)` }"
            >
                {{ step }}%
            </div>
        </div>
    </div>
</template>

<script setup>
const taxRate = defineModel('taxRate', { type: Number });

defineProps({
    taxRateMin: {
        type: Number,
        default: 0
    },
    taxRateMax: {
        type: Number,
        default: 0
    }
});

const stepper = [
    5,
    10,
    20,
    30,
    75,
    99
];
</script>

<style scoped>

</style>
