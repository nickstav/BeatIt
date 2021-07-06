import { stepSequencer } from "./main.js";
import { instruments } from './instruments.js'
import { sequencerOptions } from "../Store/store.js";
import { get } from 'svelte/store';

function playSample(selectedInstrument) {

    // If one of the tracks is currently selected, play the audio file of that instrument
    for (const instrument of Object.values(instruments)) {
        if (instrument['label'] === selectedInstrument) {
            instrument['audio'].play();
        }
    };

}

function nudgeTrack(direction) {

    // Get the currently selected track to nudge
    const selectedInstrument = get(sequencerOptions).selectedTrack;

    for (const [key, instrument] of Object.entries(instruments)) {

        // Only change commands for the selected instrument
        if (instrument['label'] === selectedInstrument) {

            // Create an array in which to store the selected instrument's play command
            let trackPlayCommands = [];

            for (let i = 0; i < stepSequencer.steps.length; i++) {
                // Store the play commands in order for seleced instrument (key)
                trackPlayCommands.push(stepSequencer.steps[i].playCommands[key]);
            };

            if (direction === 'left') {
                // Shift commands to the left be removing first value and adding it to the end
                const firstCommand = trackPlayCommands[0];
                trackPlayCommands.shift()
                trackPlayCommands.push(firstCommand);
            } else if (direction === 'right') {
                // Shift commands to the right by removing last laue and adding it to the front
                const lastCommand = trackPlayCommands[trackPlayCommands.length - 1];
                trackPlayCommands.pop();
                trackPlayCommands.unshift(lastCommand);
            }
            

            // Reassign the instrument's play commands with the new order
            for (let i = 0; i < stepSequencer.steps.length; i++) {
                stepSequencer.steps[i].playCommands[key] = trackPlayCommands[i];
            };

        };
    };

    // Ensure changes are seen in the UI
    stepSequencer.updateUI();
}

export { playSample, nudgeTrack }