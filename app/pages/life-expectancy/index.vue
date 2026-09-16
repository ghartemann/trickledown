<template>
    <div class="w-full min-h-screen flex flex-col overflow-hidden relative pb-16">
        <AppLoader v-if="loading"></AppLoader>

        <UContainer
            v-else
            class="mt-4 mb-8"
        >
            <div class="md:w-1/2 mx-auto grid grid-cols-2 gap-2">
                <UCard variant="soft" class="col-span-full text-sm text-muted">
                    <div class="w-full flex gap-4 items-center">
                        <UIcon
                            name="i-lucide-info"
                            class="size-6 shrink-0"
                        ></UIcon>

                        <USeparator
                            orientation="vertical"
                            class="h-12"
                        ></USeparator>

                        <div class="space-y-4">
                            <p>
                                This page offers purely informative and interesting information about the life expectancy of a few carefully selected people (not necessarily
                                billionaires) who, for pretty obvious reasons, I don't like very much. The figures are statistical estimates and are not intended as actual
                                predictions.
                            </p>

                            <p>
                                Fun fact: in practice, life expectancy is far from evenly distributed: extreme wealth, access to better healthcare, safer living conditions,
                                healthier lifestyles, and other advantages allow billionaires to outlive estimates easily. On the contrary, people living in poverty often face
                                substantially shorter lives, reflecting the persistent effects of inequality, limited access to healthcare, poorer living and working conditions,
                                and other socioeconomic disadvantages.
                            </p>

                            <UButton @click="showModal = true" icon="i-lucide-clock" variant="outline" color="neutral" size="xs">
                                Information about life expectancy by country
                            </UButton>
                        </div>
                    </div>
                </UCard>

                <VipContainer
                    class="col-span-full"
                    :vip-list="sortedVipList.filter(v => !v.dod)"
                    :life-expectancies="lifeExpectancies"
                ></VipContainer>

                <USeparator class="mt-16 mb-2 col-span-full"></USeparator>

                <div class="text-xs text-gray-500 italic col-span-full flex items-center justify-center gap-4">
                    <UIcon name="i-lucide-arrow-down"></UIcon>

                    <span>
                        WINNERS and/or DISQUALIFIED/DNF
                    </span>

                    <UIcon name="i-lucide-arrow-down"></UIcon>
                </div>

                <USeparator class="mt-2 mb-16 col-span-full"></USeparator>

                <VipContainer
                    class="col-span-full"
                    :vip-list="sortedVipList.filter(v => v.dod)"
                    :life-expectancies="lifeExpectancies"
                ></VipContainer>
            </div>
        </UContainer>

        <LifeExpectancyModal v-model="showModal"></LifeExpectancyModal>
    </div>
</template>

<script setup>
import AppLoader from '~/components/AppLoader.vue';
import LifeExpectancyModal from '~/components/modals/LifeExpectancyModal.vue';
import VipContainer from '~/pages/life-expectancy/components/VipContainer.vue';
import vipData from "~/constants/vipData.ts";
import lifeExpectancies from "~/constants/lifeExpectancies.js";

const loading = ref(false);
const showModal = ref(false);

const sortedVipList = ref([...vipData].sort((a, b) => a.dob.localeCompare(b.dob)));
</script>

<style scoped>

</style>
