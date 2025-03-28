import React, { Component } from "react";

class Footer extends Component {
  render() {
    if (this.props.sharedBasicInfo) {
      var networks = this.props.sharedBasicInfo.social.map(function (network) {
        return (
          <span key={network.name} className="m-4">
            <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={`${network.class} fa-2x`}></i>
            </a>
          </span>
        );
      });
    }

    return (
      <footer id="footer">
        <div className="col-md-12">
          <div className="social-links">{networks}</div>

          <div className="copyright py-4 text-center">
            <div className="container">
              <small>
                Thank you for viewing my website! I would love to connect through one of the methods above!
              </small>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

