import { writable, derived } from 'svelte/store';

const defaultValues = {
    numberOfBeats: 16,
    bpm: 120,
    showOptions: false
};

function setUpStore() {

    const { subscribe, set, update } = writable(defaultValues);

    function toggleOptionsMenu() {
        update(status => {
            return {
                ...status,
                showOptions: !status.showOptions
            };
        });
    }

    return {
	    subscribe,
        set,
        toggleOptionsMenu
    };

}

const sequencerOptions = setUpStore();


const beatsArray = derived(
    sequencerOptions,
    $sequencerOptions => {
        const beatArray = [];
        for (let i = 0; i < $sequencerOptions.numberOfBeats; i++) {
            beatArray.push(i + 1);
        }
        return beatArray;
    }
)

export { sequencerOptions, beatsArray }