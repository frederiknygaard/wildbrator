import React, { Component } from 'react';
import BannerAd from './components/BannerAd/BannerAd';
import Identity from './components/Identity/Identity';
import Slider from './components/Slider/Slider';
import Controls from './components/Controls/Controls';
import Context, { controls } from './context/data';

console.log(Context)

class App extends Component {
  state = {
    angle: 0,
    controls,
    currentMood: null
  };

  constructor(props) {
    super(props);

    this.vibrateInterval = null;
  }

  componentDidMount() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    // Then we set the value in the --vh custom property to the root of the document
    //document.querySelector('.wrapper').style.setProperty('height', `${window.innerHeight}px`);
  }

    

  // Starts vibration at passed in level
  startVibrate(duration) {
      navigator.vibrate(duration);
  }

  // Stops vibration
  stopVibrate() {
      // Clear interval and stop persistent vibrating
      if(this.vibrateInterval) clearInterval(this.vibrateInterval);
      navigator.vibrate(0);
  }

  // Start persistent vibration at given duration and interval
  // Assumes a number value is given
  startPersistentVibrate(duration, interval) {
      this.vibrateInterval = setInterval(function() {
          startVibrate(duration);
      }, interval);
  }

  selectMood(e) {
    let currentMood = e.target.dataset.value;
    currentMood = this.state.currentMood != currentMood ? currentMood : null;

    if (currentMood) {
      this.startVibrate(10000)
    } else {
      this.stopVibrate();
    }
    
    this.setState({ currentMood })
  }

  setAngle(angle) {
    //console.log(angle)
    //this.setState({ angle })
    //console.log(angle)
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='container'>
          <Context.Provider
            value={{
              controls: this.state.controls,
            }}
          >
            <BannerAd />
            <Identity />
            <Slider angle={this.state.angle} setAngle={this.setAngle.bind(this)} />
            <Controls clickHandler={this.selectMood.bind(this)} currentMood={this.state.currentMood} />
          </Context.Provider>
        </div>
      </div>
    );
  }
}

export default App;
