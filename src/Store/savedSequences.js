import { writable } from 'svelte/store';

function setUpStore() {

    const { subscribe, set, update } = writable([]);

    function saveCurrentSequence(sequenceName, sequenceArray, numberOfBeats, bpm) {
        update(sequences => {
                return [...sequences, {
                    'sequenceName': sequenceName, 
                    'sequenceInfo': sequenceArray,
                    'numberOfBeats': numberOfBeats,
                    'bpm': bpm
                }]
        });
    }

    return {
	    subscribe,
        set,
        saveCurrentSequence
    };

}

export const savedSequences = setUpStore();