import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Convert from './convert';

const Dictaphone = () => {
	const [started, setStarted] = useState(false);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const start = () => {
		setStarted(true);
        console.log('speech');
        SpeechRecognition.startListening({
            continuous: true,
            matchInterim: false,

        })
    }
	
	const stop = () => {

		setStarted(false);
		SpeechRecognition.stopListening();
	}

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn it support speech recognition.</span>;
    }

	console.log('transcript: ' + transcript);
    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
			{!started ? 
		        <button onClick={start}>Start</button>
				:
		        <button onClick={stop}>Stop</button>
			}
            <button onClick={resetTranscript}>Reset</button>
			<Convert text = {transcript} language = 'pt' />
        </div>
    );
};

export default Dictaphone;
