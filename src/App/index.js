import React, { Component } from "react";
import WeatherCards from "./Components/WeatherCards";
import getForcastData from "./Utils/networkRequests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Fade from "./Components/Fade";
import Input from "./Components/Input";
import Intro from "./Components/Intro";

class FairDays extends Component {
  state = {
    cachedResults: {},
    currentResult: {},
    errors: false,
    loading: false
  };

  resultIsCached = inputValue => this.state.cachedResults[inputValue];

  fetchAndCacheWeatherForcast = async inputValue => {
    this.setState({ errors: false });
    // Display cached results, if they exist.
    if (this.resultIsCached(inputValue)) {
      this.setState({
        currentResult: this.state.cachedResults[inputValue]
      });
    } else {
      //Otherwise fetch ,cache and display results.
      this.setState({ loading: true });
      const x = await getForcastData(inputValue).catch(() =>
        this.setState({ errors: true })
      );
      this.setState(
        () => (
          (this.state.currentResult = this.state.cachedResults[inputValue] = x),
          (this.state.loading = false)
        )
      );
    }
  };

  render() {
    const { address, forcasts = [] } =
      this.state.currentResult != undefined && this.state.currentResult;

    const goodWeatherDays = forcasts.filter(
      day =>
        day.precipProbability < 0.25 &&
        day.cloudCover < 0.7 &&
        day.temperatureHigh >= 49
    );

    // Conditions for displaying the intro and weather card components
    const showIntro =
      !forcasts.length && !this.state.loading && !this.state.errors;
    const showWeatherCards =
      forcasts.length > 0 && !this.state.loading && !this.state.errors;

    const WeatherSummary = () => (
      <div>
        <p>
          Over the next 8 days there will be { goodWeatherDays.length } good
          weather days in { address }.
        </p>
      </div>
    );

    const Loading = () => (
      <h2>
        <FontAwesomeIcon size="2x" color="gray" icon={ faSpinner } pulse />
      </h2>
    );

    const Errors = () =>
      this.state.errors && (
        <div className="errors">
          <p>
            Whoops... Someting went wrong! Are you sure your location name is
            correct? Try again!
          </p>
        </div>
      );

    return (
      <div>
        <header>
          <div className="title">
            <h1 className="fair-days">Fair Days</h1>
            <span>Weather Forcast</span>
          </div>
          <Input fetchWeather={ this.fetchAndCacheWeatherForcast } />
        </header>
        { showIntro && <Intro /> }
        <Fade showComponent={ this.state.loading } duration={ "0.2s" }>
          <Loading />
        </Fade>
        <Fade duration={ "1.0s" } showComponent={ showWeatherCards }>
          <WeatherSummary />
          <WeatherCards goodWeatherDays={ goodWeatherDays } />
        </Fade>
        <Errors />
      </div>
    );
  }
}

export default FairDays;
