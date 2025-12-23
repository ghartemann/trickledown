import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
    const baseUrl = 'https://www.forbes.com/forbesapi/person/rtb/0/rank/true.json';

    const fields = [
        'uri', 'finalWorth', 'source', 'rank',
        'person', 'personName', 'industries', 'organization', 'firstName',
        'lastName', 'squareImage', 'estWorthPrev'
    ];

    const url = new URL(baseUrl);
    url.searchParams.set('fields', fields.join(','));
    url.searchParams.set('limit', '100');
    url.searchParams.set('start', '0');

    const res = await fetch(url.toString(), {
        headers: {
            accept: 'application/json'
        }
    });

    if (!res.ok) throw new Error(`Forbes API error: ${res.status}`);

    return res.json();
});
