import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStripe, faGithub } from "@fortawesome/free-brands-svg-icons";

class ProjectDetailsModal extends Component {
  render() {
    if (this.props.data) {
      const technologies = this.props.data.technologies;
      const images = this.props.data.images;
      var title = this.props.data.title;
      var description = this.props.data.description;
      var url = this.props.data.url;
      var githubUrl = this.props.data.github;
      if (this.props.data.technologies) {
        var tech = technologies.map((icons, i) => {
          return (
            <li className="list-inline-item mx-3" key={i}>
              <span>
                <div className="text-center">
                {
  icons.name === "Stripe" ? (
    <FontAwesomeIcon icon={faStripe} size="3x" />
  ) : icons.name === "React Expo" ? (
    <img
      src={require("../images/expo.png")} // Adjust the path to your image
      
      alt="React Expo"
      style={{ width: "3.0rem", height: "3.0rem" }}
    />
    ) : icons.name === "Openvino" ? (
      <img
        src={require("../images/openvino.png")} // Adjust the path to your image
        alt="OpenVINO"
        style={{ width: "3.5rem", height: "3.0rem" }}
      />
    ) : (
    <i className={icons.class} style={{ fontSize: "300%" }}></i>
  )
}
<p className="text-center" style={{ fontSize: "30%" }}>
  {icons.name}
</p>
                </div>
              </span>
            </li>
          );
        }); 
        // if (this.props.data.images) {
        //   var img = images.map((elem, i) => {
        //     return (
        //       <div key={i} data-src={elem} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        //         <img
        //           src={elem}
        //           alt={`Project image ${i}`}
        //           style={{
        //             width: "auto",         // Don't stretch width
        //             height: "auto",        // Maintain aspect ratio
        //             maxWidth: "100%",      // Ensures it doesn't overflow the container
        //             maxHeight: "80vh",     // Ensures it doesn't exceed the viewport
        //             objectFit: "contain",  // Keeps the entire image visible
        //             display: "block",      // Avoids extra spacing
        //             margin: "auto"         // Centers the image
        //           }}
        //         />
        //       </div>
        //     );
        //   });
        // }             
        if (this.props.data.images) {
          // Skip the first image (cover image) if there are multiple images
          // But show the single image if there's only one
          var modalImages = this.props.data.images.length === 1 
            ? this.props.data.images 
            : this.props.data.images.slice(1);
          var img = modalImages.map((elem, i) => (
            <div 
              key={i} 
              data-src={elem} 
              style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center"
              }} 
            />
          ));
        }
      }
    }
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-inside"
      >
        <span onClick={this.props.onHide} className="modal-close">
          <i className="fas fa-times fa-3x close-icon"></i>
        </span>
        <div className="col-md-12">
          <div className="col-md-10 mx-auto" style={{ paddingBottom: "50px" }}>
            <div className="slider-tab">
              <span
                className="iconify slider-iconfiy"
                data-icon="emojione:red-circle"
                data-inline="false"
                style={{ marginLeft: "5px" }}
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:yellow-circle"
                data-inline="false"
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:green-circle"
                data-inline="false"
              ></span>
            </div>
            {this.props.data.images && this.props.data.images.length > 0 ? (
              this.props.data.images.length === 1 ? (
                // Single image - render without slider navigation
                <div className="slider-image" style={{
                  width: "100%", 
                  height: "auto", 
                  maxHeight: "80vh", 
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <img 
                    src={this.props.data.images[0]} 
                    alt={title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "80vh",
                      objectFit: "contain"
                    }}
                  />
                </div>
              ) : (
                // Multiple images - use slider
                <AwesomeSlider
                  cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
                  animation="scaleOutAnimation"
                  className="slider-image"
                  style={{
                    width: "100%", 
                    height: "auto", 
                    maxHeight: "80vh", 
                    objectFit: "contain"
                  }}
                >
                  {img}
                </AwesomeSlider>
              )
            ) : null}
          </div>
          <div className="col-md-10 mx-auto">
            <h3 style={{ padding: "5px 5px 0 5px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span>{title}</span>
              <span style={{ display: "flex", gap: "8px" }}>
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-href"
                    style={{ color: "inherit", textDecoration: "none" }}
                    title="View on GitHub"
                  >
                    <FontAwesomeIcon icon={faGithub} style={{ fontSize: "2rem" }} />
                  </a>
                ) : null}
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-href"
                    style={{ color: "#007bff", textDecoration: "none" }}
                    title="View project"
                  >
                    <i
                      className="fas fa-external-link-alt"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </a>
                ) : null}
              </span>
            </h3>
            <p className="modal-description">
              {description ? (() => {
                const lines = description.split('\n');
                return lines.map((line, idx) => {
                  // Check if line contains a URL
                  const urlRegex = /(https?:\/\/[^\s]+)/g;
                  const parts = line.split(urlRegex);
                  
                  return (
                    <span key={idx}>
                      {parts.map((part, partIdx) => {
                        if (part.match(/^https?:\/\//)) {
                          return (
                            <a
                              key={partIdx}
                              href={part}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#007bff', textDecoration: 'underline' }}
                            >
                              {part}
                            </a>
                          );
                        }
                        return <span key={partIdx}>{part}</span>;
                      })}
                      {idx < lines.length - 1 && <br />}
                    </span>
                  );
                });
              })() : null}
            </p>
            <div className="col-md-12 text-center">
              <ul className="list-inline mx-auto">{tech}</ul>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProjectDetailsModal;