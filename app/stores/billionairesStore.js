import { defineStore } from 'pinia';

export const useBillionairesStore = defineStore('billionaires', () => {
    const billionaires = ref([]);
    const loadingBillionaires = ref(false);

    async function fetchDataFromApi() {
        loadingBillionaires.value = true;

        try {
            const data = await $fetch('/api/billionaires');

            billionaires.value = data.personList.personsLists.filter(p => p.rank).map(billionaire => ({
                ...billionaire,
                personName: billionaire.personName.replace(' & family', ''),
                squareImage: normalizeImageUrl(billionaire.squareImage)
            }));
        } catch (error) {
            console.error('Failed to fetch billionaires:', error);
        } finally {
            loadingBillionaires.value = false;
        }
    }

    function normalizeImageUrl(url) {
        if (!url) {
            return url;
        }

        if (url.startsWith('https://')) {
            return url;
        }

        if (url.startsWith('//')) {
            return `https:${url}`;
        }

        if (url.startsWith('http://')) {
            return url.replace('http://', 'https://');
        }

        return `https://${url}`;
    }

    return {
        billionaires,
        fetchDataFromApi
    };
});
