import React from "react";
import calculateDate from "../Utils/unixTimeConverter";
import {
  WiRain as Rain,
  WiCloud as Cloud,
  WiDaySunny as Sun,
  WiThermometer as Therm
} from "react-icons/wi";
import { FaRegSadTear as Tear } from "react-icons/fa";

const ChanceOfRain = ({ rainChance }) => (
    <div className="card-item">
      <Rain size={ 50 } />
      <p>{ (rainChance * 100).toFixed() }% chance</p>
    </div>);


const CloudCover = ({ cloudCover }) => (
    <div className="card-item">
      <Cloud size={ 50 } />
      <p>Cover { (cloudCover * 100).toFixed() }%</p>
    </div>);



const SunnyDay = ({ isSunnyDay }) => ( isSunnyDay && 
      <div>
        <Sun color="#f7b167" size={ 50 } />
      </div>); 


const Temp = ({ high, low }) => {
  const farenToCelc = faren => (faren - 32) / 1.8;
  return (
    <div className="card-item">
      <Therm size={ 50 } />
      <p className="temperature-card-item">
        { farenToCelc(low).toFixed() } - { farenToCelc(high).toFixed() }°c
      </p>
    </div>
  );
};

const Card = ({ fairDay: day = {}, shrinkSingleCard } = {}) => {
  const {
    cloudCover,
    precipProbability,
    summary,
    time: unixTime,
    temperatureHigh,
    temperatureLow
  } = day;

  return (
    <div className="card" style={ shrinkSingleCard ? { maxWidth: "25%" } : null }>
      <p>{ calculateDate(unixTime) }</p>
      <ChanceOfRain rainChance={ precipProbability } />
      <CloudCover cloudCover={ cloudCover } />
      <Temp high={ temperatureHigh } low={ temperatureLow } />
      <p className="card-item">{ summary }</p>
      <SunnyDay isSunnyDay={ cloudCover < 0.3 } />
    </div>
  );
};

const WeatherCards = ({ goodWeatherDays }) => {
  if (goodWeatherDays.length > 0) {
    return (
      <div className="weather-cards-wrapper">
        { goodWeatherDays.map((day, index) => (
          <Card
            key={ index }
            fairDay={ day }
            shrinkSingleCard={ goodWeatherDays.length == 1 }
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="tear">
        <Tear size={ 50 } color="grey" />
      </div>
    );
  }
};

export default WeatherCards;
