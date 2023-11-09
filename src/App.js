import { Synth, Panner, Transport } from "tone";
import React, { useState } from "react";

const leftsynth = new Synth().toMaster();
const rightsynth = new Synth().toMaster();
const leftpanner = new Panner(-1).toMaster();
const rightpanner = new Panner(1).toMaster();
let isPlaying = false;

function startSound(leftFreq, rightFreq) {
    leftsynth.connect(leftpanner);
    rightsynth.connect(rightpanner);

    leftsynth.triggerAttack(leftFreq);
    rightsynth.triggerAttack(rightFreq);
    isPlaying = true;
}

function stopSound() {
    leftsynth.triggerRelease();
    rightsynth.triggerRelease();
    isPlaying = false;
}

function App() {
    const [leftPitch, setLeftPitch] = useState(64.4);
    const [rightPitch, setRightPitch] = useState(74.4);
    const [pitchDifference, setPitchDifference] = useState(Math.abs(leftPitch - rightPitch));

    const handlePlayClick = () => {
        if (!isPlaying) {
            Transport.start(); // Start the Tone.js transport
            setPitchDifference(Math.abs(leftPitch - rightPitch));
            startSound(leftPitch, rightPitch);
        }
    };

    const handleStopClick = () => {
        if (isPlaying) {
            stopSound();
            Transport.stop(); // Stop the Tone.js transport
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
