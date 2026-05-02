let audioContext = null;
let backgroundMusicGain = null;
let isMusicPlaying = false;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export function resumeAudioContext() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
}

export function toggleBackgroundMusic(shouldPlay) {
  const ctx = getAudioContext();
  
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  if (shouldPlay && !isMusicPlaying) {
    // Start background music
    startBackgroundMusic(ctx);
  } else if (!shouldPlay && isMusicPlaying) {
    // Stop background music
    stopBackgroundMusic();
  }
}

function startBackgroundMusic(ctx) {
  if (isMusicPlaying) return;
  
  // Create a gentle melodic ambient background music
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.15, ctx.currentTime); // Low volume for background
  backgroundMusicGain = masterGain;
  
  // Create a sequence of notes for a pleasant melody
  const melody = [
    { note: 261.63, duration: 0.5 }, // C4
    { note: 293.66, duration: 0.5 }, // D4
    { note: 329.63, duration: 0.5 }, // E4
    { note: 349.23, duration: 0.5 }, // F4
    { note: 392.00, duration: 0.5 }, // G4
    { note: 349.23, duration: 0.5 }, // F4
    { note: 329.63, duration: 0.5 }, // E4
    { note: 293.66, duration: 0.5 }, // D4
  ];
  
  let currentTime = ctx.currentTime;
  
  // Schedule multiple loops of the melody
  const numLoops = 8;
  
  for (let loop = 0; loop < numLoops; loop++) {
melody.forEach((noteData) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteData.note, currentTime);
      
      // Add slight detuning for warmth
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(noteData.note * 1.002, currentTime);
      
      osc.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(masterGain);
      
      // Smooth envelope
      const attackTime = 0.05;
      const decayTime = noteData.duration - 0.1;
      const releaseTime = 0.05;
      
      noteGain.gain.setValueAtTime(0, currentTime);
      noteGain.gain.linearRampToValueAtTime(0.3, currentTime + attackTime);
      noteGain.gain.setValueAtTime(0.3, currentTime + attackTime + decayTime);
      noteGain.gain.linearRampToValueAtTime(0, currentTime + attackTime + decayTime + releaseTime);
      
      const noteDuration = noteData.duration * 0.95;
      osc.start(currentTime);
      osc.stop(currentTime + noteDuration);
      osc2.start(currentTime);
      osc2.stop(currentTime + noteDuration);
      
      currentTime += noteData.duration;
    });
  }
  
  // Loop the music by reconnecting when done
  musicLoopTimeout = setTimeout(() => {
    if (isMusicPlaying) {
      startBackgroundMusic(ctx);
    }
  }, (currentTime - ctx.currentTime) * 1000);
  
  isMusicPlaying = true;
}

let musicLoopTimeout = null;

function stopBackgroundMusic() {
  if (musicLoopTimeout) {
    clearTimeout(musicLoopTimeout);
    musicLoopTimeout = null;
  }
  if (backgroundMusicGain) {
    backgroundMusicGain.disconnect();
    backgroundMusicGain = null;
  }
  isMusicPlaying = false;
}

export function setMusicVolume(volume) {
  if (backgroundMusicGain) {
    backgroundMusicGain.gain.setValueAtTime(volume, audioContext.currentTime);
  }
}

export function playSound(type) {
  const ctx = getAudioContext();
  
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  if (type === "error") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }

  if (type === "correct") {
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
    
    const numClaps = 25;
    
    for (let i = 0; i < numClaps; i++) {
      const delay = Math.random() * 1.5;
      const startTime = ctx.currentTime + delay;
      
      const bufferSize = 4096;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        output[j] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      
      const noiseGain = ctx.createGain();
      noise.connect(noiseGain);
      noiseGain.connect(masterGain);
      
      const clapDuration = 0.08 + Math.random() * 0.07;
      const clapVolume = 0.15 + Math.random() * 0.2;
      
      noiseGain.gain.setValueAtTime(0, startTime);
      noiseGain.gain.linearRampToValueAtTime(clapVolume, startTime + 0.01);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + clapDuration);
      
      noise.start(startTime);
      noise.stop(startTime + clapDuration);
      
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.type = "sine";
      osc.frequency.value = 1800 + Math.random() * 500;
      oscGain.gain.setValueAtTime(0, startTime);
      oscGain.gain.linearRampToValueAtTime(0.08, startTime + 0.005);
      oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);
      osc.start(startTime);
      osc.stop(startTime + 0.05);
    }
  }

  if (type === "tick") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }
  
  if (type === "timeout") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.8);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    osc.start();
    osc.stop(ctx.currentTime + 0.9);
  }
}