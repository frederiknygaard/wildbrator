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
  }

  selectMood(e) {
    let currentMood = e.target.dataset.value;
    currentMood = this.state.currentMood != currentMood ? currentMood : null;
    this.setState({ currentMood })
    //console.log(mood)
  }

  setAngle(angle) {
    console.log(angle)
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
