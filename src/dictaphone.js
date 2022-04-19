import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Convert from './convert';

import { languages } from './languages.js';

const Dictaphone = () => {
	const [started, setStarted] = useState(false);
	const [inputLanguage, setInputLanguage]	 = useState('');
	const [outputLanguage, setOutputLanguage] = useState('');

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
			language: inputLanguage,
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
	console.log('type of languages: ' + typeof(languages));
    return (
        <div>
			<select 
	        onChange={(event) => setInputLanguage(event.target.value)}>
				{
					Object.keys(languages).map((key, index) => {
					  return <option key={index} value={languages[key]}>{key}</option>
         			})
				}
	      	</select>
			<div>
				<label>
			      <textarea rows = "10" cols = "100" value={transcript} />
			    </label>
			</div>
			{!started ? 
		        <button onClick={start}>Start</button>
				:
		        <button onClick={stop}>Stop</button>
			}
            <button onClick={resetTranscript}>Reset</button>
            <p>{listening ? 'Recording' : 'Microphone off'}</p>
			<div>
				<Convert text = {transcript} language = {outputLanguage}/>
				<select onChange={(event) => setOutputLanguage(event.target.value)}>
				{
					Object.keys(languages).map((key, index) => {
					  return <option key={index} value={languages[key]}>{key}</option>
         			})
				}
		      	</select>
			</div>
        </div>
    );
};

export default Dictaphone;
