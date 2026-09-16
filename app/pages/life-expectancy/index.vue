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
                                healthier
                                lifestyles, and other advantages allow billionaires to outlive estimates easily. On the contrary, people living in poverty often face substantially
                                shorter lives, reflecting the persistent effects of inequality, limited access to healthcare, poorer living and working conditions, and other
                                socioeconomic disadvantages.
                            </p>
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
    </div>
</template>

<script setup>
import AppLoader from '~/components/AppLoader.vue';
import VipContainer from '~/pages/life-expectancy/components/VipContainer.vue';

const loading = ref(false);

const vipList = ref([
    {
        name: 'Donald Trump',
        source: 'Billionaire, President of the USA, colossal piece of shit',
        squareImage: 'https://imageio.forbes.com/specials-images/imageserve/5638e53de4b0ffa7afe6a26a/0x0.jpg?format=jpg&crop=704,704,x27,y32,safe&fit=bounds',
        dob: '1946-06-14',
        country: 'USA',
        countryCode: 'us',
        isMale: true
    },
    {
        name: 'Elon Musk',
        source: 'Billionaire, will die alone with no friends',
        squareImage: 'https://imageio.forbes.com/specials-images/imageserve/62d700cd6094d2c180f269b9/0x0.jpg?format=jpg&crop=959,959,x0,y0,safe&fit=bounds',
        dob: '1971-06-28',
        country: 'USA (born South African)',
        countryCode: 'us',
        isMale: true
    },
    {
        name: 'Mark Zuckerberg',
        source: 'Billionaire, Meta founder & CEO, lizard, moron',
        squareImage: 'https://specials-images.forbesimg.com/imageserve/5c76b7d331358e35dd2773a9/416x416.jpg?background=000000&cropX1=0&cropX2=4401&cropY1=0&cropY2=4401',
        dob: '1984-05-14',
        country: 'USA',
        countryCode: 'us',
        isMale: true
    },
    {
        name: 'Jeff Bezos',
        source: 'Billionaire, Amazon founder, taste-lacking imbecile',
        squareImage: 'https://imageio.forbes.com/specials-images/imageserve/67531eb2b5f7c9e191f632d7/0x0.jpg?format=jpg&crop=711,713,x316,y125,safe&fit=bounds',
        dob: '1964-01-12',
        country: 'USA',
        countryCode: 'us',
        isMale: true
    },
    {
        name: 'Peter Thiel',
        source: 'Billionaire, antechrist, mass surveillance advocate',
        squareImage: 'https://specials-images.forbesimg.com/imageserve/5a836fff31358e4955ad6549/416x416.jpg?background=000000&cropX1=234&cropX2=790&cropY1=7&cropY2=563',
        dob: '1967-10-11',
        country: 'USA (born West German)',
        countryCode: 'us',
        isMale: true
    },
    {
        name: 'Pierre-Édouard Stérin',
        source: 'Billionaire, far right activist',
        dob: '1974-01-03',
        country: 'France',
        countryCode: 'fr',
        isMale: true
    },
    {
        name: 'J. K. Rowling',
        source: 'Billionaire, gigantic transphobic racist old hag',
        squareImage: 'https://specials-images.forbesimg.com/imageserve/5ed56d114231c70006c8f37b/416x416.jpg?background=000000&cropX1=0&cropX2=654&cropY1=96&cropY2=750',
        dob: '1965-07-31',
        country: 'United Kingdom',
        countryCode: 'gb',
        isMale: false
    },
    {
        name: 'Benjamin Netanyahu',
        source: 'Genocidal maniac, Prime Minister of Israel',
        squareImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Benjamin_Netanyahu%2C_February_2023.jpg/500px-Benjamin_Netanyahu%2C_February_2023.jpg',
        dob: '1949-10-21',
        country: 'Israel',
        countryCode: 'il',
        isMale: true
    },
    {
        name: 'Sam Altman',
        source: 'Billionaire, was actually generated by AI',
        squareImage: 'https://imageio.forbes.com/specials-images/imageserve/661ff92a5f8d9bc634de57c6/0x0.jpg?format=jpg&crop=1619,1620,x601,y68,safe&fit=bounds',
        dob: '1985-04-22',
        country: 'USA',
        countryCode: 'us',
        isMale: true
    },
    {
        name: 'Vladimir Putin',
        source: 'President of Russia, Vlad the Invader',
        squareImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2808-03-2024%29_%28cropped%29_%28higher_res%29.jpg/500px-%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2808-03-2024%29_%28cropped%29_%28higher_res%29.jpg',
        dob: '1952-10-07',
        country: 'Russia',
        countryCode: 'ru',
        isMale: true
    },
    {
        name: 'Stephen Miller',
        source: 'Literal Nazi, Goebbels wannabe, White House official',
        squareImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Stephen_Miller_July_2025.jpg/500px-Stephen_Miller_July_2025.jpg',
        dob: '1985-08-23',
        country: 'USA',
        countryCode: 'us',
        isMale: true
    },
    {
        name: 'Nigel Farage',
        source: 'British politician, racist moron',
        squareImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Official_portrait_of_Nigel_Farage_MP_crop_2.jpg/500px-Official_portrait_of_Nigel_Farage_MP_crop_2.jpg',
        dob: '1964-04-03',
        country: 'United Kingdom',
        countryCode: 'gb',
        isMale: true
    },
    {
        name: 'Marine Le Pen',
        source: 'Convicted politician, racist and daughter of a Nazi',
        squareImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Marine_Le_Pen_2025_%28cropped%29.jpg/500px-Marine_Le_Pen_2025_%28cropped%29.jpg',
        dob: '1968-08-05',
        country: 'France',
        countryCode: 'fr',
        isMale: false
    },
    {
        name: 'Nick Fuentes',
        source: 'Christian nationalist, wants to put women in farms',
        squareImage: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Nick_Fuentes_screencap_from_July_2022_virtual_debate.png',
        dob: '1998-08-18',
        country: 'USA',
        countryCode: 'us',
        isMale: true
    },
    {
        name: 'Andrew Tate',
        source: 'Human traffiker, misogynistic piece of shit',
        squareImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Andrew_Tate_-_James_Tamim_Upload_%28Cropped_Wide_Portrait%29.png/500px-Andrew_Tate_-_James_Tamim_Upload_%28Cropped_Wide_Portrait%29.png',
        dob: '1986-12-01',
        country: 'United Kingdom',
        countryCode: 'gb',
        isMale: true
    },
    {
        name: 'Charlie Kirk',
        source: 'Dead far right influencer',
        squareImage: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Charlie_Kirk_shooting_scene_close_up.png',
        dob: '1993-10-14',
        dod: '2025-09-10',
        country: 'USA',
        countryCode: 'us',
        isMale: true
    },
    {
        name: 'Jean-Marie Le Pen',
        source: 'Dead racist war criminal, politician',
        squareImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Le_Pen_Jean-Marie_1999_%283x4_cropped%29.jpg/500px-Le_Pen_Jean-Marie_1999_%283x4_cropped%29.jpg',
        dob: '1928-06-20',
        dod: '2025-01-07',
        country: 'France',
        countryCode: 'fr',
        isMale: true
    }
]);

const sortedVipList = ref([...vipList.value].sort((a, b) => a.dob.localeCompare(b.dob)));

// UN 2023 life expectancy at birth, by country (male / female)
const lifeExpectancies = ref([
    { country: 'hk', lifeExpectancyMales: 82.84, lifeExpectancyFemales: 88.13 },
    { country: 'jp', lifeExpectancyMales: 81.69, lifeExpectancyFemales: 87.74 },
    { country: 'kr', lifeExpectancyMales: 81.19, lifeExpectancyFemales: 87.16 },
    { country: 'pf', lifeExpectancyMales: 81.78, lifeExpectancyFemales: 86.50 },
    { country: 'ad', lifeExpectancyMales: 82.10, lifeExpectancyFemales: 86.11 },
    { country: 'ch', lifeExpectancyMales: 82.01, lifeExpectancyFemales: 85.83 },
    { country: 'au', lifeExpectancyMales: 82.10, lifeExpectancyFemales: 85.74 },
    { country: 'sg', lifeExpectancyMales: 81.24, lifeExpectancyFemales: 86.24 },
    { country: 'it', lifeExpectancyMales: 81.57, lifeExpectancyFemales: 85.75 },
    { country: 'es', lifeExpectancyMales: 80.96, lifeExpectancyFemales: 86.31 },
    { country: 're', lifeExpectancyMales: 80.53, lifeExpectancyFemales: 86.33 },
    { country: 'fr', lifeExpectancyMales: 80.43, lifeExpectancyFemales: 86.09 },
    { country: 'no', lifeExpectancyMales: 81.75, lifeExpectancyFemales: 84.85 },
    { country: 'mt', lifeExpectancyMales: 81.27, lifeExpectancyFemales: 85.26 },
    { country: 'gg', lifeExpectancyMales: 81.01, lifeExpectancyFemales: 85.58 },
    { country: 'se', lifeExpectancyMales: 81.44, lifeExpectancyFemales: 85.10 },
    { country: 'mo', lifeExpectancyMales: 80.83, lifeExpectancyFemales: 85.25 },
    { country: 'ae', lifeExpectancyMales: 81.98, lifeExpectancyFemales: 84.20 },
    { country: 'is', lifeExpectancyMales: 80.98, lifeExpectancyFemales: 84.51 },
    { country: 'ca', lifeExpectancyMales: 80.43, lifeExpectancyFemales: 84.83 },
    { country: 'mq', lifeExpectancyMales: 79.25, lifeExpectancyFemales: 85.62 },
    { country: 'il', lifeExpectancyMales: 80.18, lifeExpectancyFemales: 84.59 },
    { country: 'ie', lifeExpectancyMales: 80.37, lifeExpectancyFemales: 84.48 },
    { country: 'qa', lifeExpectancyMales: 81.61, lifeExpectancyFemales: 83.37 },
    { country: 'pt', lifeExpectancyMales: 79.44, lifeExpectancyFemales: 85.12 },
    { country: 'bm', lifeExpectancyMales: 78.86, lifeExpectancyFemales: 85.74 },
    { country: 'lu', lifeExpectancyMales: 80.57, lifeExpectancyFemales: 83.84 },
    { country: 'nl', lifeExpectancyMales: 80.54, lifeExpectancyFemales: 83.74 },
    { country: 'be', lifeExpectancyMales: 79.86, lifeExpectancyFemales: 84.33 },
    { country: 'nz', lifeExpectancyMales: 80.41, lifeExpectancyFemales: 83.77 },
    { country: 'gp', lifeExpectancyMales: 78.13, lifeExpectancyFemales: 85.53 },
    { country: 'at', lifeExpectancyMales: 79.54, lifeExpectancyFemales: 84.32 },
    { country: 'dk', lifeExpectancyMales: 80.02, lifeExpectancyFemales: 83.86 },
    { country: 'fi', lifeExpectancyMales: 79.17, lifeExpectancyFemales: 84.67 },
    { country: 'gr', lifeExpectancyMales: 79.29, lifeExpectancyFemales: 84.33 },
    { country: 'pr', lifeExpectancyMales: 78.03, lifeExpectancyFemales: 85.24 },
    { country: 'cy', lifeExpectancyMales: 79.64, lifeExpectancyFemales: 83.67 },
    { country: 'si', lifeExpectancyMales: 78.90, lifeExpectancyFemales: 84.34 },
    { country: 'de', lifeExpectancyMales: 79.02, lifeExpectancyFemales: 83.76 },
    { country: 'gb', lifeExpectancyMales: 79.36, lifeExpectancyFemales: 83.21 },
    { country: 'bh', lifeExpectancyMales: 80.67, lifeExpectancyFemales: 81.99 },
    { country: 'cl', lifeExpectancyMales: 79.24, lifeExpectancyFemales: 83.08 },
    { country: 'mv', lifeExpectancyMales: 79.69, lifeExpectancyFemales: 82.82 },
    { country: 'im', lifeExpectancyMales: 78.93, lifeExpectancyFemales: 83.13 },
    { country: 'cr', lifeExpectancyMales: 78.13, lifeExpectancyFemales: 83.42 },
    { country: 'tw', lifeExpectancyMales: 77.63, lifeExpectancyFemales: 83.61 },
    { country: 'kw', lifeExpectancyMales: 79.25, lifeExpectancyFemales: 81.85 },
    { country: 'ky', lifeExpectancyMales: 77.98, lifeExpectancyFemales: 82.87 },
    { country: 'fo', lifeExpectancyMales: 78.17, lifeExpectancyFemales: 82.50 },
    { country: 'om', lifeExpectancyMales: 78.49, lifeExpectancyFemales: 81.88 },
    { country: 'cz', lifeExpectancyMales: 77.00, lifeExpectancyFemales: 82.64 },
    { country: 'je', lifeExpectancyMales: 77.72, lifeExpectancyFemales: 81.76 },
    { country: 'al', lifeExpectancyMales: 77.73, lifeExpectancyFemales: 81.45 },
    { country: 'pa', lifeExpectancyMales: 76.65, lifeExpectancyFemales: 82.56 },
    { country: 'us', lifeExpectancyMales: 76.86, lifeExpectancyFemales: 81.85 },
    { country: 'ee', lifeExpectancyMales: 74.90, lifeExpectancyFemales: 83.04 },
    { country: 'nc', lifeExpectancyMales: 76.28, lifeExpectancyFemales: 81.29 },
    { country: 'sa', lifeExpectancyMales: 77.10, lifeExpectancyFemales: 81.16 },
    { country: 'pl', lifeExpectancyMales: 74.88, lifeExpectancyFemales: 82.35 },
    { country: 'hr', lifeExpectancyMales: 75.41, lifeExpectancyFemales: 81.69 },
    { country: 'sk', lifeExpectancyMales: 75.02, lifeExpectancyFemales: 81.58 },
    { country: 'uy', lifeExpectancyMales: 74.19, lifeExpectancyFemales: 81.92 },
    { country: 'cu', lifeExpectancyMales: 75.67, lifeExpectancyFemales: 80.52 },
    { country: 'xk', lifeExpectancyMales: 75.80, lifeExpectancyFemales: 80.12 },
    { country: 'cn', lifeExpectancyMales: 75.20, lifeExpectancyFemales: 80.93 },
    { country: 'ba', lifeExpectancyMales: 74.42, lifeExpectancyFemales: 80.90 },
    { country: 'lb', lifeExpectancyMales: 75.74, lifeExpectancyFemales: 79.73 },
    { country: 'jo', lifeExpectancyMales: 75.71, lifeExpectancyFemales: 80.19 },
    { country: 'pe', lifeExpectancyMales: 75.41, lifeExpectancyFemales: 80.12 },
    { country: 'co', lifeExpectancyMales: 74.95, lifeExpectancyFemales: 80.45 },
    { country: 'ir', lifeExpectancyMales: 75.79, lifeExpectancyFemales: 79.63 },
    { country: 'ag', lifeExpectancyMales: 74.55, lifeExpectancyFemales: 80.29 },
    { country: 'lk', lifeExpectancyMales: 74.24, lifeExpectancyFemales: 80.59 },
    { country: 'ar', lifeExpectancyMales: 74.81, lifeExpectancyFemales: 79.88 },
    { country: 'mk', lifeExpectancyMales: 75.11, lifeExpectancyFemales: 79.57 },
    { country: 'ec', lifeExpectancyMales: 74.66, lifeExpectancyFemales: 80.14 },
    { country: 'gu', lifeExpectancyMales: 73.44, lifeExpectancyFemales: 81.42 },
    { country: 'tr', lifeExpectancyMales: 74.53, lifeExpectancyFemales: 79.86 },
    { country: 'me', lifeExpectancyMales: 73.73, lifeExpectancyFemales: 80.31 },
    { country: 'hu', lifeExpectancyMales: 73.71, lifeExpectancyFemales: 80.19 },
    { country: 'gf', lifeExpectancyMales: 74.13, lifeExpectancyFemales: 79.99 },
    { country: 'cw', lifeExpectancyMales: 72.46, lifeExpectancyFemales: 80.82 },
    { country: 'rs', lifeExpectancyMales: 73.50, lifeExpectancyFemales: 80.04 },
    { country: 'my', lifeExpectancyMales: 74.27, lifeExpectancyFemales: 79.37 },
    { country: 'tn', lifeExpectancyMales: 73.92, lifeExpectancyFemales: 79.15 },
    { country: 'th', lifeExpectancyMales: 72.16, lifeExpectancyFemales: 80.86 },
    { country: 'aw', lifeExpectancyMales: 73.70, lifeExpectancyFemales: 78.78 },
    { country: 'dz', lifeExpectancyMales: 74.89, lifeExpectancyFemales: 77.70 },
    { country: 'lv', lifeExpectancyMales: 71.56, lifeExpectancyFemales: 80.47 },
    { country: 'bb', lifeExpectancyMales: 73.63, lifeExpectancyFemales: 78.61 },
    { country: 'cv', lifeExpectancyMales: 72.86, lifeExpectancyFemales: 79.21 },
    { country: 'yt', lifeExpectancyMales: 74.09, lifeExpectancyFemales: 78.33 },
    { country: 'lt', lifeExpectancyMales: 71.22, lifeExpectancyFemales: 80.67 },
    { country: 'ro', lifeExpectancyMales: 72.40, lifeExpectancyFemales: 79.56 },
    { country: 'br', lifeExpectancyMales: 72.76, lifeExpectancyFemales: 78.98 },
    { country: 'am', lifeExpectancyMales: 71.39, lifeExpectancyFemales: 79.45 },
    { country: 'bg', lifeExpectancyMales: 72.16, lifeExpectancyFemales: 79.21 },
    { country: 'vi', lifeExpectancyMales: 70.51, lifeExpectancyFemales: 81.35 },
    { country: 'bn', lifeExpectancyMales: 73.33, lifeExpectancyFemales: 77.56 },
    { country: 'ma', lifeExpectancyMales: 73.17, lifeExpectancyFemales: 77.60 },
    { country: 'gd', lifeExpectancyMales: 72.36, lifeExpectancyFemales: 78.36 },
    { country: 'mx', lifeExpectancyMales: 72.24, lifeExpectancyFemales: 77.81 },
    { country: 'ni', lifeExpectancyMales: 72.31, lifeExpectancyFemales: 77.42 },
    { country: 'mu', lifeExpectancyMales: 71.94, lifeExpectancyFemales: 78.18 },
    { country: 'bd', lifeExpectancyMales: 73.03, lifeExpectancyFemales: 76.37 },
    { country: 'vn', lifeExpectancyMales: 69.88, lifeExpectancyFemales: 79.26 },
    { country: 'bs', lifeExpectancyMales: 70.91, lifeExpectancyFemales: 78.19 },
    { country: 'ge', lifeExpectancyMales: 69.57, lifeExpectancyFemales: 79.11 },
    { country: 'by', lifeExpectancyMales: 69.53, lifeExpectancyFemales: 79.06 },
    { country: 'az', lifeExpectancyMales: 71.56, lifeExpectancyFemales: 77.13 },
    { country: 'kz', lifeExpectancyMales: 70.11, lifeExpectancyFemales: 78.39 },
    { country: 'py', lifeExpectancyMales: 70.89, lifeExpectancyFemales: 76.95 },
    { country: 'do', lifeExpectancyMales: 70.53, lifeExpectancyFemales: 76.97 },
    { country: 'kp', lifeExpectancyMales: 71.46, lifeExpectancyFemales: 75.74 },
    { country: 'sr', lifeExpectancyMales: 70.46, lifeExpectancyFemales: 76.83 },
    { country: 'bz', lifeExpectancyMales: 70.93, lifeExpectancyFemales: 76.50 },
    { country: 'tt', lifeExpectancyMales: 70.38, lifeExpectancyFemales: 76.68 },
    { country: 'ua', lifeExpectancyMales: 66.90, lifeExpectancyFemales: 80.20 },
    { country: 'ru', lifeExpectancyMales: 67.26, lifeExpectancyFemales: 79.04 },
    { country: 'bt', lifeExpectancyMales: 71.31, lifeExpectancyFemales: 74.97 },
    { country: 'to', lifeExpectancyMales: 69.37, lifeExpectancyFemales: 76.41 },
    { country: 'hn', lifeExpectancyMales: 70.35, lifeExpectancyFemales: 75.50 },
    { country: 'sc', lifeExpectancyMales: 69.94, lifeExpectancyFemales: 76.52 },
    { country: 'lc', lifeExpectancyMales: 69.31, lifeExpectancyFemales: 76.30 },
    { country: 'gt', lifeExpectancyMales: 70.31, lifeExpectancyFemales: 74.88 },
    { country: 've', lifeExpectancyMales: 68.72, lifeExpectancyFemales: 76.50 },
    { country: 'uz', lifeExpectancyMales: 69.45, lifeExpectancyFemales: 75.40 },
    { country: 'iq', lifeExpectancyMales: 70.43, lifeExpectancyFemales: 74.06 },
    { country: 'sy', lifeExpectancyMales: 69.83, lifeExpectancyFemales: 74.41 },
    { country: 'sv', lifeExpectancyMales: 67.52, lifeExpectancyFemales: 76.26 },
    { country: 'in', lifeExpectancyMales: 70.52, lifeExpectancyFemales: 73.60 },
    { country: 'tj', lifeExpectancyMales: 69.57, lifeExpectancyFemales: 73.98 },
    { country: 'mn', lifeExpectancyMales: 67.24, lifeExpectancyFemales: 76.43 },
    { country: 'ws', lifeExpectancyMales: 69.86, lifeExpectancyFemales: 73.66 },
    { country: 'kg', lifeExpectancyMales: 68.18, lifeExpectancyFemales: 75.25 },
    { country: 'eg', lifeExpectancyMales: 69.49, lifeExpectancyFemales: 73.81 },
    { country: 'jm', lifeExpectancyMales: 68.97, lifeExpectancyFemales: 73.99 },
    { country: 'vu', lifeExpectancyMales: 69.44, lifeExpectancyFemales: 73.93 },
    { country: 'eh', lifeExpectancyMales: 69.69, lifeExpectancyFemales: 73.55 },
    { country: 'vc', lifeExpectancyMales: 68.66, lifeExpectancyFemales: 74.31 },
    { country: 'md', lifeExpectancyMales: 66.57, lifeExpectancyFemales: 75.53 },
    { country: 'id', lifeExpectancyMales: 69.04, lifeExpectancyFemales: 73.27 },
    { country: 'dm', lifeExpectancyMales: 68.21, lifeExpectancyFemales: 74.55 },
    { country: 'kh', lifeExpectancyMales: 68.01, lifeExpectancyFemales: 73.19 },
    { country: 'sb', lifeExpectancyMales: 69.22, lifeExpectancyFemales: 71.98 },
    { country: 'np', lifeExpectancyMales: 68.83, lifeExpectancyFemales: 71.84 },
    { country: 'gy', lifeExpectancyMales: 66.51, lifeExpectancyFemales: 73.94 },
    { country: 'tm', lifeExpectancyMales: 66.87, lifeExpectancyFemales: 72.84 },
    { country: 'gl', lifeExpectancyMales: 68.09, lifeExpectancyFemales: 72.44 },
    { country: 'ph', lifeExpectancyMales: 66.89, lifeExpectancyFemales: 72.82 },
    { country: 'st', lifeExpectancyMales: 66.24, lifeExpectancyFemales: 73.73 },
    { country: 'ly', lifeExpectancyMales: 68.27, lifeExpectancyFemales: 70.42 },
    { country: 'ye', lifeExpectancyMales: 67.23, lifeExpectancyFemales: 71.39 },
    { country: 'bw', lifeExpectancyMales: 66.67, lifeExpectancyFemales: 71.70 },
    { country: 'la', lifeExpectancyMales: 66.78, lifeExpectancyFemales: 71.25 },
    { country: 'sn', lifeExpectancyMales: 66.79, lifeExpectancyFemales: 70.75 },
    { country: 'er', lifeExpectancyMales: 66.51, lifeExpectancyFemales: 70.66 },
    { country: 'bo', lifeExpectancyMales: 66.13, lifeExpectancyFemales: 71.14 },
    { country: 'mr', lifeExpectancyMales: 66.50, lifeExpectancyFemales: 70.48 },
    { country: 'ga', lifeExpectancyMales: 65.91, lifeExpectancyFemales: 71.05 },
    { country: 'ug', lifeExpectancyMales: 65.27, lifeExpectancyFemales: 71.12 },
    { country: 'rw', lifeExpectancyMales: 65.49, lifeExpectancyFemales: 69.89 },
    { country: 'tl', lifeExpectancyMales: 66.07, lifeExpectancyFemales: 69.44 },
    { country: 'pk', lifeExpectancyMales: 65.33, lifeExpectancyFemales: 70.16 },
    { country: 'na', lifeExpectancyMales: 63.33, lifeExpectancyFemales: 71.34 },
    { country: 'mw', lifeExpectancyMales: 64.07, lifeExpectancyFemales: 70.56 },
    { country: 'fj', lifeExpectancyMales: 65.34, lifeExpectancyFemales: 69.36 },
    { country: 'et', lifeExpectancyMales: 64.08, lifeExpectancyFemales: 70.73 },
    { country: 'fm', lifeExpectancyMales: 63.49, lifeExpectancyFemales: 71.12 },
    { country: 'tz', lifeExpectancyMales: 64.20, lifeExpectancyFemales: 69.78 },
    { country: 'mm', lifeExpectancyMales: 63.79, lifeExpectancyFemales: 70.16 },
    { country: 'km', lifeExpectancyMales: 64.79, lifeExpectancyFemales: 68.93 },
    { country: 'ki', lifeExpectancyMales: 64.58, lifeExpectancyFemales: 68.17 },
    { country: 'zm', lifeExpectancyMales: 63.94, lifeExpectancyFemales: 68.67 },
    { country: 'sd', lifeExpectancyMales: 63.27, lifeExpectancyFemales: 69.63 },
    { country: 'za', lifeExpectancyMales: 62.61, lifeExpectancyFemales: 69.60 },
    { country: 'pg', lifeExpectancyMales: 63.74, lifeExpectancyFemales: 69.08 },
    { country: 'af', lifeExpectancyMales: 64.47, lifeExpectancyFemales: 67.54 },
    { country: 'dj', lifeExpectancyMales: 63.52, lifeExpectancyFemales: 68.51 },
    { country: 'gm', lifeExpectancyMales: 64.17, lifeExpectancyFemales: 67.53 },
    { country: 'cg', lifeExpectancyMales: 64.12, lifeExpectancyFemales: 67.46 },
    { country: 'gh', lifeExpectancyMales: 63.13, lifeExpectancyFemales: 67.94 },
    { country: 'ps', lifeExpectancyMales: 59.69, lifeExpectancyFemales: 71.50 },
    { country: 'ht', lifeExpectancyMales: 61.73, lifeExpectancyFemales: 68.30 },
    { country: 'ao', lifeExpectancyMales: 62.10, lifeExpectancyFemales: 67.14 },
    { country: 'sz', lifeExpectancyMales: 61.19, lifeExpectancyFemales: 66.95 },
    { country: 'gw', lifeExpectancyMales: 61.66, lifeExpectancyFemales: 66.36 },
    { country: 'gq', lifeExpectancyMales: 62.04, lifeExpectancyFemales: 65.66 },
    { country: 'cm', lifeExpectancyMales: 61.52, lifeExpectancyFemales: 65.94 },
    { country: 'bi', lifeExpectancyMales: 61.60, lifeExpectancyFemales: 65.70 },
    { country: 'ke', lifeExpectancyMales: 61.46, lifeExpectancyFemales: 65.92 },
    { country: 'mg', lifeExpectancyMales: 61.94, lifeExpectancyFemales: 65.38 },
    { country: 'mz', lifeExpectancyMales: 60.30, lifeExpectancyFemales: 66.54 },
    { country: 'zw', lifeExpectancyMales: 60.23, lifeExpectancyFemales: 65.01 },
    { country: 'tg', lifeExpectancyMales: 62.54, lifeExpectancyFemales: 62.92 },
    { country: 'lr', lifeExpectancyMales: 60.88, lifeExpectancyFemales: 63.44 },
    { country: 'ci', lifeExpectancyMales: 60.02, lifeExpectancyFemales: 64.13 },
    { country: 'cd', lifeExpectancyMales: 59.79, lifeExpectancyFemales: 64.04 },
    { country: 'sl', lifeExpectancyMales: 60.06, lifeExpectancyFemales: 63.50 },
    { country: 'ne', lifeExpectancyMales: 60.26, lifeExpectancyFemales: 62.13 },
    { country: 'bf', lifeExpectancyMales: 58.92, lifeExpectancyFemales: 63.22 },
    { country: 'bj', lifeExpectancyMales: 59.35, lifeExpectancyFemales: 62.21 },
    { country: 'gn', lifeExpectancyMales: 59.52, lifeExpectancyFemales: 61.90 },
    { country: 'ml', lifeExpectancyMales: 59.04, lifeExpectancyFemales: 61.90 },
    { country: 'so', lifeExpectancyMales: 56.35, lifeExpectancyFemales: 61.39 },
    { country: 'ss', lifeExpectancyMales: 54.64, lifeExpectancyFemales: 60.63 },
    { country: 'cf', lifeExpectancyMales: 55.26, lifeExpectancyFemales: 59.29 },
    { country: 'ls', lifeExpectancyMales: 54.62, lifeExpectancyFemales: 60.01 },
    { country: 'td', lifeExpectancyMales: 53.20, lifeExpectancyFemales: 57.01 },
    { country: 'ng', lifeExpectancyMales: 54.18, lifeExpectancyFemales: 54.74 }
]);
</script>

<style scoped>

</style>
