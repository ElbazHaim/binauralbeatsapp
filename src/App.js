import { Synth, Panner, Transport } from "tone";
import React, { useState } from "react";

class BinauralBeat {
    constructor(leftFreq, rightFreq) {
        this.leftSynth = new Synth().toMaster();
        this.rightSynth = new Synth().toMaster();
        this.leftPanner = new Panner(-1).toMaster();
        this.rightPanner = new Panner(1).toMaster();
        this.isPlaying = false;

        this.leftSynth.connect(this.leftPanner);
        this.rightSynth.connect(this.rightPanner);

        this.leftFreq = leftFreq;
        this.rightFreq = rightFreq;
    }

    start() {
        this.leftSynth.triggerAttack(this.leftFreq);
        this.rightSynth.triggerAttack(this.rightFreq);
        this.isPlaying = true;
    }

    stop() {
        this.leftSynth.triggerRelease();
        this.rightSynth.triggerRelease();
        this.isPlaying = false;
    }
}

function App() {
    const [leftPitch, setLeftPitch] = useState(41.63);
    const [rightPitch, setRightPitch] = useState(40.00);
    const [pitchDifference, setPitchDifference] = useState(Math.abs(leftPitch - rightPitch));

    let binauralBeat;

    const handlePlayClick = () => {
        if (!binauralBeat || !binauralBeat.isPlaying) {
            Transport.start();
            setPitchDifference(Math.abs(leftPitch - rightPitch));
            binauralBeat = new BinauralBeat(leftPitch, rightPitch);
            binauralBeat.start();
        }
    };

    const handleStopClick = () => {
        if (binauralBeat && binauralBeat.isPlaying) {
            binauralBeat.stop();
            Transport.stop();
        }
    };

    return (
        <div>
            <div>
                <label>Left Pitch: </label>
                <input
                    type="number"
                    step="0.1"
                    value={leftPitch}
                    onChange={(e) => setLeftPitch(parseFloat(e.target.value))}
                /> Hz
            </div>
            <div>
                <label>Right Pitch: </label>
                <input
                    type="number"
                    step="0.1"
                    value={rightPitch}
                    onChange={(e) => setRightPitch(parseFloat(e.target.value))}
                /> Hz
            </div>
            <div>
                <p>Binaural Beat: {pitchDifference} Hz</p>
            </div>
            <button onClick={handlePlayClick}>Play</button>
            <button onClick={handleStopClick}>Stop</button>
        </div>
    );
}

export default App;
