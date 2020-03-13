import React, { Component } from "react";

class Input extends Component {
  state = {
    invalidInput: false,
    textInput: "Enter a City, Town or Postcode"
  };

  handleInputSubmit = e => {
    e.preventDefault();
    this.setState({ invalidInput: false });
    // remove whitespace and special characters - this helps with caching locations
    const inputValue = this.state.textInput.replace(/[^\w\d]|\_/g, "");

    if (inputValue.length > 0) {
      this.props.fetchWeather(inputValue);
    } else {
      this.setState({ invalidInput: true });
    }
  };

  handleChange = event => {
    this.setState({ textInput: event.target.value });
  };

  clearInput = () => {
    this.setState({ textInput: "" });
  };

  render() {
    return (
      <div className="location-input">
        <form>
          <label>
            <input
              type="text"
              onChange={this.handleChange}
              onFocus={this.clearInput}
              value={this.state.textInput}
            />
            <button onClick={this.handleInputSubmit}>Search</button>
            {this.state.invalidInput && (
              <p className="invalid-input">
                Hmmm... have you entered a location?
              </p>
            )}
          </label>
        </form>
      </div>
    );
  }
}

export default Input;
