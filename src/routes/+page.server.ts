import Jutsu from '$lib/server/db/models/Jutsu';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const jutsus = await Jutsu.findAll();
    console.log('Loaded jutsus:', jutsus.map(j => j.toJSON()));
    return {
        jutsus: jutsus.map(j => j.toJSON())
    };
};