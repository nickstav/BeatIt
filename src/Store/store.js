import { writable, derived } from 'svelte/store';
import { instruments } from '../JS/instruments';

const defaultValues = {
    numberOfBeats: 4,
    bpm: 120,
    selectedTrack: null,
    trackKey: null,
    selectedSavedSequence: null
};

function setUpStore() {

    const { subscribe, set, update } = writable(defaultValues);

    function updateSettingsFromSavedSequence(sequence) {
        update(status => {
            return {
                ...status,
                bpm: sequence['bpm'],
                numberOfBeats: sequence['numberOfBeats']
            }
        });
    }

    function toggleTrackSelection(track) {
        update(status => {
            if (track != null && status.selectedTrack != instruments[track]['label']) {

                return {
                    ...status,
                    selectedTrack: instruments[track]['label'],
                    trackKey: track
                };

            } else {
                return {
                    ...status,
                    selectedTrack: null,
                    trackKey: null
                };
            }
        });
    }

    function toggleSelectedSavedSequence(sequenceIndex) {
        update(status => {
            if (sequenceIndex === status.selectedSavedSequence) {
                return {
                    ...status,
                    selectedSavedSequence: null
                };
            } else {
                return {
                    ...status,
                    selectedSavedSequence: sequenceIndex
                };
            }
        })
    }

    return {
	    subscribe,
        set,
        updateSettingsFromSavedSequence,
        toggleTrackSelection,
        toggleSelectedSavedSequence
    };

}

const sequencerOptions = setUpStore();


const beatsArray = derived(
    sequencerOptions,
    $sequencerOptions => {
        const beatArray = [];
        for (let i = 0; i < ($sequencerOptions.numberOfBeats * 4); i++) {
            beatArray.push(i);
        }
        return beatArray;
    }
)

export { sequencerOptions, beatsArray }