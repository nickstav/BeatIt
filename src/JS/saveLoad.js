import { stepSequencer } from "./main.js";
import { savedSequences } from "../Store/savedSequences.js";
import { sequencerOptions } from "../Store/store.js";
import { get } from 'svelte/store';

function saveCurrentSequence() {

    // Create an array to store sequence information
    let savedSequence = [];

    // Get a sequence name from the user
    let sequenceName = prompt("Enter sequence name");

    // Take user name and store the sequence information in the store
    if (sequenceName != null) {

        // Store the play commands for each instrument 
        stepSequencer.steps.forEach((step) => {
            savedSequence.push(step.playCommands);
        });

        const bpm = get(sequencerOptions).bpm;
        const numberOfBeats = get(sequencerOptions).numberOfBeats;

        savedSequences.saveCurrentSequence(sequenceName, savedSequence, numberOfBeats, bpm);
    }
}

function loadSequence(sequence) {

    // Update the window's bpm and beats settings using the saved values for the sequence
    sequencerOptions.updateSettingsFromSavedSequence(sequence);

    // Update the live sequencer now values have changed
    stepSequencer.updateBPM();
    stepSequencer.updateSteps();

    // Add the saved play commands to the live sequencer
    for (let i = 0; i < sequence['numberOfBeats']; i++) {
        stepSequencer.steps[i].playCommands = sequence['sequenceInfo'][i]

    }

    // Ensure changes are reflected in the UI
    stepSequencer.updateUI();
}

export { saveCurrentSequence, loadSequence }