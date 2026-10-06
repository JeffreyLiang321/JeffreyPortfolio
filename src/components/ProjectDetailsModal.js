import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import TechTags from "./TechTags";

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

// Split the description into paragraphs and turn bare URLs into links.
const renderDescription = (description) =>
  description
    .split(/\n\s*\n/)
    .filter((para) => para.trim())
    .map((para, i) => (
      <p key={i}>
        {para.split(URL_PATTERN).map((part, j) =>
          /^https?:\/\//.test(part) ? (
            <a key={j} href={part} target="_blank" rel="noopener noreferrer">
              {part}
            </a>
          ) : (
            <React.Fragment key={j}>{part}</React.Fragment>
          )
        )}
      </p>
    ));

class ProjectDetailsModal extends Component {
  render() {
    const data = this.props.data || {};
    const { title, description, technologies, images } = data;

    // The first image is the card cover; show the rest here unless it's the only one.
    const modalImages = images ? (images.length === 1 ? images : images.slice(1)) : [];

    const links = [
      data.github && { href: data.github, label: "GitHub", icon: <FontAwesomeIcon icon={faGithub} /> },
      data.demo && { href: data.demo, label: "Live demo", icon: <i className="fas fa-play" /> },
      data.extension && { href: data.extension, label: "Chrome extension", icon: <i className="fab fa-chrome" /> },
      data.url && { href: data.url, label: "View project", icon: <i className="fas fa-external-link-alt" /> },
    ].filter(Boolean);

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="project-modal-title"
        centered
        className="project-modal"
      >
        <button type="button" className="project-modal-close" onClick={this.props.onHide} aria-label="Close">
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>

        {modalImages.length > 0 && (
          <div className="project-modal-media">
            {modalImages.length === 1 ? (
              <img src={modalImages[0]} alt={`${title} screenshot`} />
            ) : (
              <AwesomeSlider
                cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
                animation="scaleOutAnimation"
              >
                {modalImages.map((src) => (
                  <div key={src} data-src={src} />
                ))}
              </AwesomeSlider>
            )}
          </div>
        )}

        <div className="project-modal-body">
          <h2 id="project-modal-title" className="project-modal-title">
            {title && title.trim()}
          </h2>

          {links.length > 0 && (
            <div className="project-modal-links">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary button-small"
                >
                  <span aria-hidden="true">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <div className="project-modal-description">
            {description ? renderDescription(description) : null}
          </div>

          <TechTags technologies={technologies} />
        </div>
      </Modal>
    );
  }
}

export default ProjectDetailsModal;
