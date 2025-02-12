import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import { FaLink } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStripe } from "@fortawesome/free-brands-svg-icons";

class ProjectDetailsModal extends Component {
  render() {
    if (this.props.data) {
      const technologies = this.props.data.technologies;
      const images = this.props.data.images;
      var title = this.props.data.title;
      var description = this.props.data.description;
      var url = this.props.data.url;
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
        if (this.props.data.images) {
          var img = images.map((elem, i) => {
            return (
              <div key={i} style={{ textAlign: "center", padding: "10px" }}>
                <img
                  src={require(`../images/${elem}`)}
                  alt={`Project Image ${i}`}
                  style={{
                    width: "100%",
                    maxHeight: "350px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            );
          });
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
            <AwesomeSlider
              cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
              animation="scaleOutAnimation"
              className="slider-image"
            >
              {img}
            </AwesomeSlider>
          </div>
          <div className="col-md-10 mx-auto">
            <h3 style={{ padding: "5px 5px 0 5px" }}>
            {title}
              {url ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  <FaLink size={20} style={{ color: "#007bff" }} />
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-href"
                    style={{
                      color: "#007bff",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    Visit Project
                  </a>
                </div>
              ) : null}
            </h3>
            <p className="modal-description">{description}</p>
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
