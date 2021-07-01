import { get } from 'svelte/store';
import { sequencerOptions } from '../Store/store.js'
import { IntervalTimer } from './timer.js'
import { Step } from './step.js'
import { SvelteUpdatable } from './svelteUpdatable.js'

export class Sequencer extends SvelteUpdatable {
    constructor() {
        super()

        // Get number of beats and bpm from the store
        this.numberOfSteps = get(sequencerOptions).numberOfBeats * 4;
        this.bpm = get(sequencerOptions).bpm;

        // Set up a timer to run the sequence
        this.intervalTimer = new IntervalTimer(this.bpm, this.numberOfSteps);

        // Create a step for each beat
        this.steps = [];
        for (let i = 0; i < this.numberOfSteps; i++) {
            this.steps.push(new Step(i));
        }
    }

    // Toggle on/off whether audio is to be played for a given step
    toggleAudio = (instrument, stepNumber) => {
        this.steps[stepNumber].toggleAudio(instrument);

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Toggle on/off looping of playback
    toggleLooping = () => {
        this.intervalTimer.loopPlayback = !this.intervalTimer.loopPlayback;

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Remove all active beats from the sequence
    clearSequence = () => {
        this.steps.forEach(step => {
            for (const instrument of Object.keys(step.playCommands)) {
                step.playCommands[instrument] = false;
            }
        });

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Function to control whether the UI is to display "selected" colour or not
    displayActiveUI = (instrument, stepNumber) => {
        return this.steps[stepNumber].playCommands[instrument];
    }

    // Function to tell UI whether playback is in progress or not
    playbackInProgress = () => {
        return this.intervalTimer.isPlaying;
    }

    // Update the BPM whenever the value is changed in the UI
    updateBPM = () => {
        this.bpm = get(sequencerOptions).bpm;
        this.intervalTimer.tempo = 60000 / this.bpm;
    }

    // Update the array of steps whenever number of beats is altered in the UI
    updateSteps = () => {

        const oldNumberOfSteps = this.numberOfSteps;

        // Get the new value
        this.numberOfSteps = get(sequencerOptions).numberOfBeats * 4;
        this.intervalTimer.numberOfSteps = this.numberOfSteps;

        // Add or remove steps from the array as required
        if (oldNumberOfSteps < this.numberOfSteps) {

            for (let i = oldNumberOfSteps; i < this.numberOfSteps; i++) {
                this.steps.push(new Step(i));
            }

        } else if (oldNumberOfSteps > this.numberOfSteps) {

            this.steps.splice(-1, (this.numberOfSteps - oldNumberOfSteps));
            
        }
    }

    // Play the beat for a given step number in the sequence
    playBeat = (stepNumber) => {
       this.steps[stepNumber].playStep();

       // Manually call updateUI method to see changes reflected in the UI
       this.updateUI();
    }

    // Play the entire sequence of steps
    playSequence = () => {  
        this.intervalTimer.runSteps(this.playBeat);

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    stopPlayback = () => {
        this.intervalTimer.stopPlayback();

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    pausePlayback = () => {
        this.intervalTimer.pausePlayback();

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

}