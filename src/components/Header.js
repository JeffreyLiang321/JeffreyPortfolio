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
      <header id="home" style={{ height: window.innerHeight - 140, display: 'block' }}>
        <div className="row aligner" style={{height: '100%'}}>
          <div className="col-md-12">
            <div>
            <img
  style={{
    width: '40%', // Increase for mobile
    maxWidth: '150px', // Prevent it from getting too large
    height: 'auto', // Auto to maintain aspect ratio
    borderRadius: '50%',
    objectFit: 'cover', 
    marginBottom: "-2%",
    objectPosition: 'top center',
    transform: 'translateY(-50%)' // Less extreme shift
  }}
  src={require('../images/Jeffrey_headshot.jpeg')} 
  alt="Avatar"
/>
              
              {/* <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span> */}
              <br/>
              <h1 className="mb-0">
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
              <div style={{ marginTop: '0px' }}>
              <a
    href={require('../images/Jeffrey_Liang_Resume.pdf')} // Ensure correct file path
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: '12px 24px',
      backgroundColor: '#E94B3C',
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '16px',
    }}
  >
    View Resume
  </a>
          </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;