import { instruments } from './instruments.js'

function playSample(selectedInstrument) {

    // If one of the tracks is currently selected, play the audio file of that instrument
    for (const instrument of Object.values(instruments)) {
        if (instrument['label'] === selectedInstrument) {
            instrument['audio'].play();
        }
    };

}

export { playSample }