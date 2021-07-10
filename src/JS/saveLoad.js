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

            const sequenceArray = {};

            for (const [instrument, playCommand] of Object.entries(step.playCommands)) {
                sequenceArray[instrument] = playCommand;
            };

            savedSequence.push(sequenceArray);

        });

        const bpm = get(sequencerOptions).bpm;
        const numberOfBeats = get(sequencerOptions).numberOfBeats;

        savedSequences.saveCurrentSequence(sequenceName, savedSequence, numberOfBeats, bpm);
    }
}

function loadSequence() {

    // Get the selected sequence from the store
    const sequenceIndex = get(sequencerOptions).selectedSavedSequence;
    const sequence = get(savedSequences)[sequenceIndex];

    // Update the window's bpm and beats settings using the saved values for the sequence
    sequencerOptions.updateSettingsFromSavedSequence(sequence);

    // Update the live sequencer now values have changed
    stepSequencer.updateBPM();
    stepSequencer.updateSteps();

    // Add the saved play commands to the live sequencer
    for (let i = 0; i < sequence['numberOfBeats'] * 4; i++) {

        for (const instrument of Object.keys(stepSequencer.steps[i].playCommands)) {
            stepSequencer.steps[i].playCommands[instrument] = sequence['sequenceInfo'][i][instrument]
        };

    }

    // Ensure changes are reflected in the UI
    stepSequencer.updateUI();
}

// Toggle the selected sequence as saved/unsaved by reference to its position in the saved array
function selectSequence(sequence) {
    const savedSequencesArray = get(savedSequences);
    const sequenceIndex = savedSequencesArray.indexOf(sequence);
    sequencerOptions.toggleSelectedSavedSequence(sequenceIndex);
}

function deleteSequence() {

    // Get the selected sequence from the store
    const sequenceIndex = get(sequencerOptions).selectedSavedSequence;
    const sequence = get(savedSequences)[sequenceIndex];

    // Set the logged selected sequence index back to null
    sequencerOptions.toggleSelectedSavedSequence(sequenceIndex);

    // Remove sequence from the store
    savedSequences.deleteCurrentSequence(sequence);
}

export { saveCurrentSequence, loadSequence, selectSequence, deleteSequence }