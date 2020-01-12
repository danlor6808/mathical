import { writable } from 'svelte/store';

function createProblems() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set,
        update,
        reset: () => set([])
    }
}

function createDifficulty() {
    const { subscribe, set, update } = writable('10');

    return {
        subscribe,
        set,
        update,
        reset: () => set('10')
    }
}

export const problems = createProblems();
export const difficulty = createDifficulty();