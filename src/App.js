import React, { Component } from "react";

import BannerAd from "./components/BannerAd/BannerAd";
import Identity from "./components/Identity/Identity";
import Slider from "./components/Slider/Slider";
import Controls from "./components/Controls/Controls";
import Context from "./context/data";
import data from "../data.json";

class App extends Component {
  state = {
    controls: [],
    angle: 0,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      controls: data.controls,
    });
  }

  selectMood(e) {
    let angle = 0;

    switch (e.target.dataset.value) {
      case "Slow": {
        angle = 40;
        break;
      }
      case "Easy": {
        angle = 120;
        break;
      }
      case "Fast": {
        angle = 200;
        break;
      }
      case "Wild": {
        angle = 280;
        break;
      }
      default: {
        angle = 0;
        break;
      }
    }

    console.log(angle);

    this.setState({ angle });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <Context.Provider
            value={{
              controls: this.state.controls,
            }}
          >
            <BannerAd />
            <Identity />
            <Slider angle={this.state.angle} />
            <Controls clickHandler={this.selectMood.bind(this)} />
          </Context.Provider>
        </div>
      </div>
    );
  }
}

export default App;
