export default defineEventHandler(async (event) => {

    const runTimeConfig = useRuntimeConfig();
    const params = getQuery(event);

    const response = await fetch(`${runTimeConfig.baseUrlApi}/api/data`, {
        headers: {
            'Content-Type': 'application/json',
            'Origin': `${runTimeConfig.public.api}`,
            'x-api-key': `${runTimeConfig.apiSecret}`,
        }
    }).then(response => response.json());

    return response;
})