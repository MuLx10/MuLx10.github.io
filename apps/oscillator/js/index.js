const AC = new AudioContext()


// Creates a wrapper object around a Web Audio Oscillator plus Gain
const createAudioNode = ({type = "sine", freq = 440, gain = 1.0} = {}) => {
  const _osc = AC.createOscillator()
  _osc.frequency.value = freq
  _osc.type = type
  _osc.start()
  const _gain = AC.createGain()
  _gain.gain.value = gain
  _osc.connect(_gain)
  return {
    get type() {
      return _osc.type
    },
    set type(val) {
      _osc.type = val
    },
    get freq() {
      return _osc.frequency.value
    },
    set freq(val) {
      _osc.frequency.value = val
    },
    get gain() {
      return _gain.gain.value
    },
    set gain(val) {
      _gain.gain.value = val
    },
    _gain, _osc    
  }
}

const app = new Vue({
  el: '#app',
  data: {
    carrier: createAudioNode({
      type: "sine",
      freq: 440,
      gain: 0.3
    }),
    mods: []
  },
  mounted() {
    this.analyser = AC.createAnalyser()
    this.analyser.fftSize = 2048
    this.analyser.connect(AC.destination)
    this.buffer = new Uint8Array(this.analyser.frequencyBinCount)
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.anim()
  },
  methods: { 
    addOscillator(type = "sine", freq = 1, gain = 100.0) {
      this.disconnectNodes()
      this.mods.push(createAudioNode({type, freq, gain}))
      this.connectNodes()      
    },
    removeOscillator(idx) {
      this.disconnectNodes()
      this.mods.splice(idx, 1)
      this.connectNodes()
    },
    connectNodes() {
      if (this.mods.length > 0) {
        this.mods[0]._gain.connect(this.carrier._osc.frequency)
        for (i = 1;i < this.mods.length; i++) {
          this.mods[i]._gain.connect(this.mods[i-1]._gain.gain)
        }
      }
    },
    disconnectNodes() {
      this.mods.map(mod => mod._gain.disconnect())
    },
    play() {
      if (AC.state === "suspended") {
        AC.resume()
      }
      this.disconnectNodes()
      this.connectNodes()
      this.carrier._gain.connect(this.analyser)
    },
    stop() {
      this.carrier._gain.disconnect()
    },
    anim() {
      requestAnimationFrame(() => this.anim())
      const { ctx, canvas, analyser, buffer } = this
      const width = canvas.width || 400
      const height = canvas.height || 300
      ctx.strokeStyle="rgb(128,255,128)"
      ctx.clearRect(0,0, width, height)
      analyser.getByteTimeDomainData(buffer)
      const dx = width / buffer.length
      const my = height / 2
      ctx.beginPath()
      ctx.moveTo(0, my + ((127-buffer[0]) / 128.0) * my)
      for (let i = 1; i < buffer.length; i++) {
        ctx.lineTo(i * dx, my + ((127-buffer[i]) / 128.0) * my)
      }
      ctx.stroke()
    }
  }
})