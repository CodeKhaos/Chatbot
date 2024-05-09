export const handlePlay = (text: string, voice: string, pitch: string, rate: string, volume: string) => {
  const synth = window.speechSynthesis;

  const u = new SpeechSynthesisUtterance(text);
  
  const voices = window.speechSynthesis.getVoices();
  const synthVoice = voices.find((v) => v.name === voice);
  
  u.voice = synthVoice ? synthVoice : voices[0]
  u.pitch = parseFloat((pitch || pitch !== '') ? pitch : "1")
  u.rate = parseFloat((rate || rate !== '') ? rate : "1")
  u.volume = parseFloat((volume || volume !== '') ? volume : "1")
  console.log("Speaking: ", u)
  synth.speak(u); 
};

