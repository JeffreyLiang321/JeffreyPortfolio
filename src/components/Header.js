import React, { Component } from "react";

class Header extends Component {
  render() {
    const info = this.props.sharedData;
    const roles = info ? info.titles.join(" & ") : "";
    const tagline = info ? info.tagline : "";

    return (
      <header id="home" className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">
              Hi, I'm <span className="hero-title-accent">Jeffrey</span>.
            </h1>
            <p className="hero-role">{roles}</p>
            <p className="hero-tagline">{tagline}</p>
            <div className="hero-actions">
              <a
                href={require("../images/Jeffrey_Liang_Resume.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                View Resume
              </a>
              <a href="#portfolio" className="button-secondary">
                View Work
              </a>
            </div>
          </div>

          <div className="hero-photo">
            <img
              src={require("../images/casual_headshot.jpg")}
              alt="Portrait of Jeffrey Liang"
              width="748"
              height="783"
              fetchpriority="high"
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
