import { get } from 'svelte/store';
import { sequencerOptions } from '../Store/store.js'
import { IntervalTimer } from './timer.js'
import { Step } from './step.js'
import { SvelteUpdatable } from './svelteUpdatable.js'
import { instruments } from "./instruments";

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

        // Define boolean to instruct whether to mute a track
        this.trackMuted = {};
        for (const instrument of Object.keys(instruments)) {
            this.trackMuted[instrument] = false;
        }

        // Define boolean to instruct whether to make a track high volume
        this.highVolume = {};
        for (const instrument of Object.keys(instruments)) {
            this.highVolume[instrument] = false;
        }
    }

    // Toggle on/off whether audio is to be played for a given step
    toggleAudio = (instrument, stepNumber) => {
        this.steps[stepNumber].toggleAudio(instrument);

        // Deselect any previously selected tracks
        sequencerOptions.toggleTrackSelection(null)

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Toggle on/off looping of playback
    toggleLooping = () => {
        this.intervalTimer.loopPlayback = !this.intervalTimer.loopPlayback;

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Turn on/off muting of selected track
    toggleMuting = () => {

        const selectedTrack = get(sequencerOptions).selectedTrack;

        for (const instrument of Object.keys(instruments)) {

            if (instruments[instrument]['label'] === selectedTrack) {
                this.trackMuted[instrument] = !this.trackMuted[instrument];
            };

        }

        // Update UI to show effects
        this.updateUI();
    }

    // Turn on/off muting of all other tracks other than selected
    toggleSoloing = () => {

        const selectedTrack = get(sequencerOptions).selectedTrack;

        // Get the number of currently unmuted tracks 
        const numberOfUnmutedTracks = Object.values(this.trackMuted).filter(bool => bool === false).length;

        for (const instrument of Object.keys(instruments)) {

            // Ensure selected track to solo is unmuted
            if (instruments[instrument]['label'] === selectedTrack) {
                this.trackMuted[instrument] = false;
            }

            // If it is the only unmuted track, then we need to toggle soloing off by turning other tracks on
            if (numberOfUnmutedTracks === 1) {

                this.trackMuted[instrument] = false;
            
            // Else we need to turn soloing on by muting all other tracks
            } else if (instruments[instrument]['label'] != selectedTrack) {

                this.trackMuted[instrument] = true;
            }

        };

        // Update UI to show effects
        this.updateUI();
    }

    // Turn on/off velocity of selected track
    toggleVelocity = () => {

        const selectedTrack = get(sequencerOptions).selectedTrack;

        for (const instrument of Object.keys(instruments)) {

            if (instruments[instrument]['label'] === selectedTrack) {
                this.highVolume[instrument] = !this.highVolume[instrument];
            };

        };

        // Update UI to show effects
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

    // Remove all active beats from a specific instrument
    clearTrack = () => {

        const selectedTrack = get(sequencerOptions).selectedTrack;

        this.steps.forEach(step => {
            for (const instrument of Object.keys(step.playCommands)) {

                if (instruments[instrument]['label'] === selectedTrack) {
                    step.playCommands[instrument] = false;
                };
  
            }
        });

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Function to control whether the UI is to display "selected" colour or not
    displayActiveUI = (instrument, stepNumber) => {

        // ensure UI updates *after* step has been created within the sequence
        if (this.steps[stepNumber]) {
            return this.steps[stepNumber].playCommands[instrument];
        }

    }

    // Function to tell UI whether playback is in progress or not
    playbackInProgress = () => {
        return this.intervalTimer.isPlaying;
    }

    // Update the BPM whenever the value is changed in the UI
    updateBPM = () => {
        this.bpm = get(sequencerOptions).bpm;
        this.intervalTimer.tempo = 60000 / this.bpm / 4;
    }

    // Update the array of steps whenever number of beats is altered in the UI
    updateSteps = () => {

        const oldNumberOfSteps = this.numberOfSteps;

        // Get the new value
        this.numberOfSteps = get(sequencerOptions).numberOfBeats * 4;
        this.intervalTimer.lastStepNumber = this.numberOfSteps - 1;

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
       this.steps[stepNumber].playStep(this.trackMuted, this.highVolume);

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