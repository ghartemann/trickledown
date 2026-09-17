<template>
    <UCard class="overflow-hidden">
        <template #header>
            <div class="flex items-center justify-between gap-4">
                <UUser
                    :name="vip.name"
                    :description="vip.source"
                    :avatar="{
                        src: vip.squareImage,
                        alt: vip.name,
                        text: (vip.name.match(/\p{Lu}/gu) || []).join(''),
                        class: {'grayscale': vip.dod}
                    }"
                    size="lg"
                >
                    <template #name>
                        <div class="flex items-center gap-2">
                            <span>{{ vip.name }}</span>

                            <UBadge
                                variant="soft"
                                :color="lifeBadge.color"
                                class="xl:hidden uppercase"
                                :icon="lifeBadge.icon"
                                size="sm"
                            >
                                {{ lifeBadge.label }}
                            </UBadge>
                        </div>
                    </template>
                </UUser>

                <UBadge
                    variant="soft"
                    :color="lifeBadge.color"
                    class="hidden xl:flex uppercase"
                    :icon="lifeBadge.icon"
                    size="sm"
                >
                    {{ lifeBadge.label }}
                </UBadge>
            </div>
        </template>

        <div class="grid grid-cols-2 gap-3">
            <UCard
                v-for="(d, i) in data"
                :key="i"
                variant="soft"
                :ui="{body: '!p-4'}"
            >
                <div class="flex items-center gap-2 text-muted">
                    <UIcon :name="d.icon"></UIcon>
                    <span class="text-xs font-medium">{{ d.name }}</span>
                </div>

                <p class="mt-2 text-sm font-semibold">
                    {{ d.value }}
                </p>
            </UCard>

            <UCard variant="soft" class="col-span-full">
                <div class="mb-2 flex items-center justify-between text-sm">
                    <span class="font-medium">
                        Life progress
                    </span>

                    <span class="text-muted">
                        {{ lifePercentage }}%
                    </span>
                </div>

                <UProgress
                    :model-value="lifePercentage"
                    :color="vip.dod && lifePercentage < 100 ? 'success' : lifePercentage === 100 ? 'error' : lifePercentage >= 70 ? 'success' : 'warning'"
                ></UProgress>

                <div class="mt-1 text-center text-sm italic text-gray-500">
                    <template v-if="vip.dod">
                        <span>
                            {{ lifePercentage < 100
                            ? 'they still had '
                            : 'exceeded life exp. by ' }}
                        </span>

                        <span class="font-semibold">
                            {{ lifeLeft.replace('-', '') }}
                        </span>

                        <span v-if="lifePercentage < 100">
                            left :((((
                        </span>
                    </template>

                    <template v-else>
                        <span v-if="lifePercentage === 100">
                            exceeded life exp. by
                        </span>

                        <span class="font-semibold">
                            {{ lifeLeft.replace('-', '') }}
                        </span>

                        <span v-if="lifePercentage < 100">
                            remaining
                        </span>
                    </template>
                </div>
            </UCard>
        </div>
    </UCard>
</template>

<script setup>
import useFormat from '~/composables/format.js';

const props = defineProps({
    vip: {
        type: Object,
        required: true
    },
    generalLifeExpectancy: {
        type: Number,
        required: true
    }
});

const format = useFormat();

const age = computed(() => {
    return format.getAge(props.vip.dob, props.vip.dod);
});

const ageFormatted = computed(() => {
    return format.formatHours(age.value * 8760, true, true, true).join(' ');
});

const lifeLeft = computed(() => {
    return format.formatAge(props.generalLifeExpectancy - age.value);
});

const lifePercentage = computed(() => {
    if (!props.generalLifeExpectancy) {
        return 0;
    }

    return Math.min(
        100,
        Math.round((age.value / props.generalLifeExpectancy) * 100)
    );
});

const data = computed(() => {
    const d = [];

    d.push({
        name: 'Born',
        value: format.formatDate(props.vip.dob),
        icon: 'i-lucide-calendar-days'
    });

    if (!props.vip.dod) {
        d.push({
            name: 'Age',
            value: ageFormatted.value + ' old',
            icon: 'i-lucide-cake'
        });
    } else {
        d.push({
            name: 'Dead',
            value: format.formatDate(props.vip.dod) + ' (at ' + Math.floor(age.value) + ')',
            icon: 'i-lucide-skull'
        });
    }

    d.push(
        {
            name: 'Life expectancy',
            value: props.generalLifeExpectancy + ` years (${props.vip.countryCode.toUpperCase()}, ${props.vip.isMale ? 'M' : 'F'})`,
            icon: 'i-lucide-heart-pulse'
        },
        {
            name: 'Country',
            value: props.vip.country,
            icon: 'i-lucide-map-pin'
        }
    );

    return d;
});

const lifeBadge = computed(() => {
    const percentage = lifePercentage.value;

    if (props.vip.dod) {
        return {
            color: 'success',
            icon: 'i-lucide-check-circle',
            label: percentage >= 100
                ? 'winner winner chicken dinner'
                : 'busted'
        };
    }

    if (percentage >= 100) {
        return {
            color: 'error',
            icon: 'i-lucide-triangle-alert',
            label: 'overdue'
        };
    }

    if (percentage >= 90) {
        return {
            icon: 'i-lucide-hourglass',
            label: 'final stretch'
        };
    }

    if (percentage >= 80) {
        return {
            icon: 'i-lucide-hourglass',
            label: 'almost there'
        };
    }

    if (percentage >= 70) {
        return {
            icon: 'i-lucide-hourglass',
            label: 'working on it'
        };
    }

    if (percentage >= 45 && percentage < 60) {
        return {
            color: 'warning',
            icon: 'i-lucide-hourglass',
            label: 'halfway there'
        };
    }

    return {
        color: 'warning',
        icon: 'i-lucide-hourglass',
        label: 'plenty of time'
    };
});
</script>

