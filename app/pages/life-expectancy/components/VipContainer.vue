<template>
    <div class="flex flex-col gap-2">
        <VipCard
            v-for="(vip, index) in vipList"
            :key="vip.name"
            :vip="vip"
            :general-life-expectancy="findLifeExpectancy(vip.countryCode, vip.isMale)"
        ></VipCard>
    </div>
</template>

<script setup>
import VipCard from '~/pages/life-expectancy/components/VipCard.vue';

const props = defineProps({
    vipList: {
        type: Array,
        required: true
    },
    lifeExpectancies: {
        type: Array,
        required: true
    }
});

function findLifeExpectancy(country, isMale) {
    const le = props.lifeExpectancies.find((l) => l.country === country);

    if (!le) {
        return null;
    }

    return isMale ? le.lifeExpectancyMales : le.lifeExpectancyFemales;
}
</script>

<style scoped>

</style>
