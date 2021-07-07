import { instruments } from "./instruments";

export class Step {
    constructor(sequenceNumber) {

        // Define the step number within the sequence
        this.sequenceNumber = sequenceNumber;

        this.instruments = {};
        for (const [instrument, data] of Object.entries(instruments)) {
            this.instruments[instrument] = data['audio'];
        }

        // Define boolean to instruct whether to play instrument or not for this step
        this.playCommands = {};
        for (const instrument of Object.keys(this.instruments)) {
            this.playCommands[instrument] = false;
        }
    }

    // Play the required instrument(s) for this beat if has been selected
    playStep = (trackMuted, highVolume) => {
        for (const [instrument, playCommand] of Object.entries(this.playCommands)) {

            // Set volume of each instrument depending on whether "velocity" is on/off
            if (highVolume[instrument]) {
                this.instruments[instrument].volume = 1.0;
            } else {
                this.instruments[instrument].volume = 0.5;
            }

            if (playCommand && !trackMuted[instrument]) {

                // Clear the playback from any previous steps
                this.instruments[instrument].pause();
                this.instruments[instrument].currentTime = 0;

                // Play the audio instance for this step
                this.instruments[instrument].play();
            }
        } 
    }

    // Toggle on/off whether audio is to be played for this step
    toggleAudio = (instrument) => {
        this.playCommands[instrument] = !this.playCommands[instrument];
    }
}