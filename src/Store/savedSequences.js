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

    function deleteCurrentSequence(sequence) {
        update(sequences => {
            return sequences.filter(item => item != sequence);
        })
    }

    return {
	    subscribe,
        set,
        saveCurrentSequence,
        deleteCurrentSequence
    };

}

export const savedSequences = setUpStore();