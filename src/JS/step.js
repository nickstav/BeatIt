import { instruments } from "./instruments";

export class Step {
    constructor(sequenceNumber) {

        // Define the step number within the sequence
        this.sequenceNumber = sequenceNumber;

        // Get audio files for each instrument
        this.instruments = {
            'snareDrum': new Audio('audio/snare.mp3'),
            'hiHat': new Audio('audio/hi_hat.mp3'),
            'kickDrum': new Audio('audio/kick-drum.mp3')
        }
        // TODO - why the below no worky for all steps..?
        /*
        this.instruments = {};
        for (const [instrument, data] of Object.entries(instruments)) {
            this.instruments[instrument] = data['audio']
        }
        */
    
        // Define boolean to instruct whether to play instrument or not for this step
        this.playCommands = {};
        for (const instrument of Object.keys(this.instruments)) {
            this.playCommands[instrument] = false;
        }
    }

    // Play the required instrument(s) for this beat if has been selected
    playStep = () => {
        for (const [instrument, playCommand] of Object.entries(this.playCommands)) {

            if (playCommand) {
                this.instruments[instrument].play();
            }
        } 
    }

    // Toggle on/off whether audio is to be played for this step
    toggleAudio = (instrument) => {
        this.playCommands[instrument] = !this.playCommands[instrument];
    }
}