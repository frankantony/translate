import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSpeechSynthesis } from "react-speech-kit";

const Convert = ({ text, language }) => {
	const [convertedText, setConvertedText] = useState('');
	const { speak } = useSpeechSynthesis();

	const speech = (value) => {
		<div>
		    <button onClick={() => speak({ text: value })}>
		    	Speech
		    </button>
		</div>
	}	

	useEffect(() => {
    const response = axios
      .post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: text,
            target: language,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
          }
        }
      )
      .then((response) => {
        setConvertedText(response.data.data.translations[0].translatedText);
      })
      .catch((err) => {
        console.log('rest api error', err);
      });
	 }, [text, language]);

	console.log("converted: " + convertedText);
	
  return (<div>
		   <label>
    	      <textarea value={convertedText} onChange={(event) => setConvertedText(event.target.value)} />
    	    </label>
		  <div>
    	  <button onClick={() => speak({ text: convertedText })}>
    	   Speech
    	  </button>
		  </div>
		</div>);
};

export default Convert;
