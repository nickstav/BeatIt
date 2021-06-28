import { get } from 'svelte/store';
import { sequencerOptions } from '../Store/store.js'
import { Step } from './step.js'
import { SvelteUpdatable } from './svelteUpdatable.js'

export class Sequencer extends SvelteUpdatable {
    constructor() {
        super()

        // Get number of beats and bpm from the store
        this.numberOfBeats = get(sequencerOptions).numberOfBeats;
        this.bpm = get(sequencerOptions).bpm;

        // Define variables to track live playback and whether looping is selected
        this.currentStepNumber = null;
        this.isPlaying = false;
        this.loopPlayback = false;

        // Define the interval between steps in ms
        this.tempo = 60000 / this.bpm;

        // Create a step for each beat
        this.steps = [];
        for (let i = 0; i < this.numberOfBeats; i++) {
            this.steps.push(new Step(i + 1));
        }

        // Define variable to playback the sequence that can be played/stopped/paused
        this.liveSequence = null;
    }

    // Toggle on/off whether audio is to be played for a given step
    toggleAudio = (instrument, stepNumber) => {
        this.steps[stepNumber - 1].toggleAudio(instrument);

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Toggle on/off looping of playback
    toggleLooping = () => {
        this.loopPlayback = !this.loopPlayback;

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Function to control whether the UI is to display "selected" colour or not
    displayActiveUI = (instrument, stepNumber) => {
        return this.steps[stepNumber - 1].playCommands[instrument];
    }

    // Function to tell UI whether playback is in progress or not
    playbackInProgress = () => {
        return this.isPlaying;
    }

    // Update the BPM whenever the value is changed in the UI
    updateBPM = () => {
        this.bpm = get(sequencerOptions).bpm;
        this.tempo = 60000 / this.bpm;
    }

    // Update the array of steps whenever number of beats is altered in the UI
    updateSteps = () => {

        const oldNumberOfBeats = this.numberOfBeats;

        // Get the new value
        this.numberOfBeats = get(sequencerOptions).numberOfBeats;

        // Add or remove steps from the array as required
        if (oldNumberOfBeats > this.numberOfBeats) {

            for (let i = oldNumberOfBeats; i < this.numberOfBeats; i++) {
                this.steps.push(new Step(i + 1));
            }

        } else if (oldNumberOfBeats < this.numberOfBeats) {

            this.steps.splice(-1, (this.numberOfBeats - oldNumberOfBeats));
            
        }
    }

    // Play the beat for a given step number in the sequence
    playBeat = (stepNumber) => {
       this.steps[stepNumber - 1].playStep();
    }

    // Play the entire sequence of steps
    playSequence = () => {  

        this.isPlaying = true;

        // Start at the first step if playback was not paused previously
        if (!this.currentStepNumber) {
            this.currentStepNumber = 1; 
        }

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
         
        this.liveSequence = setInterval(() => { 

            // Play current step and move onto the next in the sequence   
           this.playBeat(this.currentStepNumber);
           this.currentStepNumber++;

            // Stop counting up the steps once we have reached the total number of beats
           if (this.currentStepNumber === this.numberOfBeats) {

               // If looping is on, reset to the start of the sequence
                if (this.loopPlayback) {
                    setTimeout(()=> {this.currentStepNumber = 1}, this.tempo);

                // Else stop the playback
                } else {
                    clearInterval(this.liveSequence);
                    this.currentStepNumber = null;
                    this.isPlaying = false;
                }
            
            // Manually call updateUI method to see changes reflected in the UI
            this.updateUI();
           }

        // Define the interval between each step as the tempo
        }, this.tempo);
    }

    // Stop the playback and reset the current step number
    stopPlayback = () => {
        if (this.liveSequence) {
            clearInterval(this.liveSequence);
            this.currentStepNumber = null;
            this.isPlaying = false;

            // Manually call updateUI method to see changes reflected in the UI
            this.updateUI();
        }
    }

    // Stop playback but keep current value of this.currentStepNumber so playback can be continued from that step
    pausePlayback = () => {
        if (this.liveSequence) {
            clearInterval(this.liveSequence);
            this.isPlaying = false;

            // Manually call updateUI method to see changes reflected in the UI
            this.updateUI();
        }
    }

}