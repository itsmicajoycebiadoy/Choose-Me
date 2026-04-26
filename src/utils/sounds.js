let audioContext = null;

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
    // APPLAUSE SOUND EFFECT
    // Create a main gain for the applause
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
    
    // Create multiple clap-like sounds using noise bursts
    const numClaps = 25;
    
    for (let i = 0; i < numClaps; i++) {
      // Random timing between 0 and 1.5 seconds
      const delay = Math.random() * 1.5;
      const startTime = ctx.currentTime + delay;
      
      // Create white noise for clap sound
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
      
      // Randomize clap characteristics
      const clapDuration = 0.08 + Math.random() * 0.07;
      const clapVolume = 0.15 + Math.random() * 0.2;
      
      noiseGain.gain.setValueAtTime(0, startTime);
      noiseGain.gain.linearRampToValueAtTime(clapVolume, startTime + 0.01);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + clapDuration);
      
      noise.start(startTime);
      noise.stop(startTime + clapDuration);
      
      // Add a short high-frequency beep to simulate hand clap
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
    
    // Add a cheer sound at the end
    setTimeout(() => {
      const cheerGain = ctx.createGain();
      cheerGain.connect(ctx.destination);
      cheerGain.gain.setValueAtTime(0.25, ctx.currentTime);
      cheerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      
      // Create a "woo" sound
      const wooOsc = ctx.createOscillator();
      const wooGain = ctx.createGain();
      wooOsc.connect(wooGain);
      wooGain.connect(cheerGain);
      wooOsc.type = "sine";
      wooOsc.frequency.setValueAtTime(440, ctx.currentTime);
      wooOsc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      wooOsc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.6);
      wooGain.gain.setValueAtTime(0.2, ctx.currentTime);
      wooGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      wooOsc.start();
      wooOsc.stop(ctx.currentTime + 0.8);
      
      // Add some cheering voices (multiple oscillators)
      for (let i = 0; i < 8; i++) {
        const cheerOsc = ctx.createOscillator();
        const cheerGainNode = ctx.createGain();
        cheerOsc.connect(cheerGainNode);
        cheerGainNode.connect(cheerGain);
        cheerOsc.type = "triangle";
        const freq = 300 + Math.random() * 300;
        cheerOsc.frequency.value = freq;
        cheerGainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.05);
        cheerGainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + i * 0.05 + 0.02);
        cheerGainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.25);
        cheerOsc.start(ctx.currentTime + i * 0.05);
        cheerOsc.stop(ctx.currentTime + i * 0.05 + 0.3);
      }
    }, 600);
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