import { writable } from 'svelte/store';

function setUpStore() {

    const { subscribe, set, update } = writable([]);

    function saveCurrentSequence(sequenceName, sequenceArray) {
        update(sequences => {
                return [...sequences, {'sequenceName': sequenceName, 'sequenceInfo': sequenceArray }]
        });
    }

    return {
	    subscribe,
        set,
        saveCurrentSequence
    };

}

export const savedSequences = setUpStore();