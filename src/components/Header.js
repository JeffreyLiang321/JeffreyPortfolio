import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.setTheme();
  }

  setTheme() {
    // var dataThemeAttribute = "data-theme";
    // var body = document.body;
    // var newTheme =
    //   body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    // body.setAttribute(dataThemeAttribute, newTheme);
  }

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles.map(x => [ x.toUpperCase(), 1500 ] ).flat();
    }

    const HeaderTitleTypeAnimation = React.memo( () => {
      return <Typical className="title-styles" steps={this.titles} loop={50} />
    }, (props, prevProp) => true);

    return (
      <header id="home" className="hero-section">
        <div className="container-fluid">
          <div className="hero-content-wrapper">
            {/* Left Column - Text Content */}
            <div className="hero-text-column">
              <div className="hero-text-content">
                <h1 className="hero-title">
                  Hi,<br />
                  I'm <span className="hero-name-accent">Jeffrey</span>
                </h1>
                <h2 className="hero-subtitle">
                  <HeaderTitleTypeAnimation />
                </h2>
                <div className="hero-button-container">
                  <a
                    href={require('../images/Jeffrey_Liang_Resume.pdf')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-resume-button"
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(233, 75, 60, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(233, 75, 60, 0.3)';
                    }}
                  >
                    View Resume
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Column - Profile Picture */}
            <div className="hero-image-column">
              <div className="hero-image-wrapper">
                <div className="hero-headshot-container">
                  <img
                    className="hero-headshot-image"
                    src={require('../images/Jeffrey_headshot.jpeg')} 
                    alt="Jeffrey Liang"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;