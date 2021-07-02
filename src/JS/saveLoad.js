import { stepSequencer } from "./main.js";
import { savedSequences } from "../Store/savedSequences.js";
import { get } from 'svelte/store';

function saveCurrentSequence() {

    // Create an array to store sequence information
    let savedSequence = [];

    // Get a sequence name from the user
    let sequenceName = prompt("Enter sequence name");

    if (sequenceName != null) {

        // Store the play commands for each instrument 
        stepSequencer.steps.forEach((step) => {
            savedSequence.push(step.playCommands);
        });

        savedSequences.saveCurrentSequence(sequenceName, savedSequence);
    }
}

export { saveCurrentSequence }