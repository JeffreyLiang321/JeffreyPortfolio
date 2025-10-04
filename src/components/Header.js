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
      <header id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#F2B28C', padding: '0 5%' }}>
        <div className="container-fluid">
          <div className="row align-items-center" style={{ minHeight: '80vh' }}>
            {/* Left Column - Text Content */}
            <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
              <div style={{ paddingLeft: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
                  <h1 style={{ 
                    fontSize: '4rem', 
                    fontWeight: '700', 
                    color: '#2c3e50', 
                    marginBottom: '0',
                    lineHeight: '1.1',
                    textAlign: 'left',
                    width: '100%'
                  }}>
                    Hi,<br />
                    I'm <span style={{ color: '#E94B3C' }}>Jeffrey</span>
                  </h1>
                  <h2 style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: '600', 
                    color: '#E94B3C', 
                    marginBottom: '0',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'left',
                    width: '100%'
                  }}>
                    <HeaderTitleTypeAnimation />
                  </h2>
                  <div style={{ marginTop: '0' }}>
                  <a
                    href={require('../images/Jeffrey_Liang_Resume.pdf')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '15px 40px',
                      background: '#E94B3C',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '16px',
                      display: 'inline-block',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(233, 75, 60, 0.3)'
                    }}
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
            </div>
            
            {/* Right Column - Profile Picture */}
            <div className="col-lg-6 col-md-12">
              <div style={{ 
                position: 'relative', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: '500px'
              }}>
                <div style={{
                  position: 'relative',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E94B3C 0%, #C73E1D 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 40px rgba(233, 75, 60, 0.3)',
                  transform: 'rotate(-5deg)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'rotate(0deg) scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'rotate(-5deg) scale(1)'}
                >
                  <img
                    style={{
                      width: '85%',
                      height: '85%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      border: '4px solid #fff',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                    }}
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