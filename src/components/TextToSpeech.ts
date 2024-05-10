export const handlePlay = (synth: SpeechSynthesis, utterance: SpeechSynthesisUtterance) => {
  synth.speak(utterance); 
};

