import React, { Component } from "react";

const SOCIAL_LABELS = {
  email: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
};

class Footer extends Component {
  render() {
    const social = this.props.sharedBasicInfo ? this.props.sharedBasicInfo.social : [];
    const email = social.find((network) => network.name === "email");
    const emailAddress = email ? email.url.replace(/^mailto:/, "") : null;
    const others = social.filter((network) => network.name !== "email");

    return (
      <footer id="contact" className="contact">
        <div className="section-inner">
          <h2 className="contact-heading">Get in Touch</h2>
          <p className="contact-lede">
            Please feel free to reach out! Email is the fastest way to reach me. I'm also on GitHub and LinkedIn.
          </p>
          <div className="contact-actions">
            {emailAddress && (
              <a className="contact-email" href={email.url}>
                {emailAddress}
              </a>
            )}
            <ul className="contact-links">
              {others.map((network) => (
                <li key={network.name}>
                  <a href={network.url} target="_blank" rel="noopener noreferrer">
                    <i className={network.class} aria-hidden="true"></i>
                    {SOCIAL_LABELS[network.name] || network.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="contact-copyright">© {new Date().getFullYear()} Jeffrey Liang</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
