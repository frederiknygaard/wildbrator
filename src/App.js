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
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      controls: data.controls,
    });
  }

  render() {
    return (
      <div>
        <Context.Provider
          value={{
            controls: this.state.controls,
          }}
        >
          <BannerAd />
          <Identity />
          <Slider />
          <Controls />
        </Context.Provider>
      </div>
    );
  }
}

export default App;
