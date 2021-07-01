export class IntervalTimer {
    constructor(beatsPerMinute, numberOfSteps) {

        // Get the number of required steps and the tempo (time between steps)
        this.tempo = 60000 / beatsPerMinute / 4;
        this.lastStepNumber = numberOfSteps - 1; // (as we start counting from 0 instead of 1)
        this.currentStepNumber = null;

        // Define variables to track live playback and whether looping is selected
        this.loopPlayback = false;
        this.isPlaying = false;

        // Define variable to run the timer that can be played/stopped/paused
        this.liveSequence = null;

        // Define a variable to track the error in sequence timing
        this.deltaT = 0;

        // Define the interval to be used in step sequencing
        this.interval = this.tempo - this.deltaT;
    }

    runSteps = (stepJobs) => {

        this.isPlaying = true;
        const startTime = performance.now();

        // Start at the first step if playback was not paused previously
        if (!this.currentStepNumber) {
            this.currentStepNumber = 0; 
        }

        this.liveSequence = setInterval(() => {

            // Carry out actionable function and move onto next step
            stepJobs(this.currentStepNumber);
            this.currentStepNumber++;

            // Stop counting up the steps once we have reached the total number of beats
           if (this.currentStepNumber > this.lastStepNumber) {
        
               // If looping is on, reset to the start of the sequence
                if (this.loopPlayback) {
                    this.currentStepNumber = 0;
        
                // Else stop the playback
                } else {
                    this.stopPlayback();
                }

           } 

            // Calculate the error in the interval timing and pass it to deltaT
            const timeElapsed = performance.now() - startTime;
            this.deltaT = timeElapsed - (this.currentStepNumber * this.tempo);
            console.log(timeElapsed);
       
        // Use calculated interval between each step
        }, this.interval);

    }

    // Stop the playback and reset the current step number
    stopPlayback = () => {
        if (this.liveSequence) {
            clearInterval(this.liveSequence);
            this.currentStepNumber = null;
            this.isPlaying = false;
            this.deltaT = 0;
        }
    }

    // Stop playback but keep current value of this.currentStepNumber so playback can be continued from that step
    pausePlayback = () => {
        if (this.liveSequence) {
            clearInterval(this.liveSequence);
            this.isPlaying = false;
        }
    }
}