<template>
    <UModal
        v-model:open="model"
        title="Life expectancy around the world"
        close-icon="i-lucide-x"
        :ui="{content: 'max-w-6xl'}"
    >
        <template #body>
            <UTable
                v-model:sorting="sorting"
                :data="lifeExpectancies"
                :columns="columns"
                sticky
                class="max-h-[70vh]"
                :ui="{ th: 'px-4 py-2', td: 'px-4 py-1.5' }"
            >
                <template #countryName-cell="{ row }">
                    <div class="flex items-center gap-1">
                        <NuxtImg
                            :src="`https://flagcdn.com/w80/${row.original.country}.png`"
                            class="rounded w-5 h-4"
                        />
                        {{ row.original.countryName }}
                    </div>
                </template>

                <template #lifeExpectancyFemales-cell="{ row }">
                    <span class="font-mono">
                        {{ row.original.lifeExpectancyFemales.toFixed(2) }}
                    </span>
                </template>

                <template #lifeExpectancyMales-cell="{ row }">
                    <span class="font-mono">
                        {{ row.original.lifeExpectancyMales.toFixed(2) }}
                    </span>
                </template>
            </UTable>
        </template>
    </UModal>
</template>

<script setup>
import { h, resolveComponent } from 'vue';
import lifeExpectancies from '~/constants/lifeExpectancies.js';

const UIcon = resolveComponent('UIcon');
const UButton = resolveComponent('UButton');

const model = defineModel({
    type: Boolean,
    default: false
});

function sortableHeader(icon, label) {
    return ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
            color: 'neutral',
            variant: 'ghost',
            class: '-mx-2.5 font-semibold',
            icon: isSorted
                ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow')
                : undefined,
            trailing: true,
            onClick: () => column.toggleSorting(isSorted === 'asc')
        }, () => [
            h(UIcon, { name: icon, class: 'mr-1' }),
            label
        ]);
    };
}

const femaleRank = new Map([...lifeExpectancies].sort((a, b) => b.lifeExpectancyFemales - a.lifeExpectancyFemales).map((row, index) => [row.countryName, index + 1]));

const columns = [
    {
        id: 'rank',
        header: '#',
        cell: ({ row }) => femaleRank.get(row.original.countryName),
        meta: { class: { th: 'w-10 text-center', td: 'text-center text-muted font-medium' } }
    },
    {
        accessorKey: 'countryName',
        header: sortableHeader('i-lucide-map-pin', 'Country')
    },
    {
        accessorKey: 'lifeExpectancyFemales',
        header: sortableHeader('i-lucide-venus', 'Females')
    },
    {
        accessorKey: 'lifeExpectancyMales',
        header: sortableHeader('i-lucide-mars', 'Males')
    }
];

const sorting = ref([{
    id: 'lifeExpectancyFemales',
    desc: true
}]);
</script>
