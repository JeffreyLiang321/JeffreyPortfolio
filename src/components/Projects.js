import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
    };
  }

  render() {
    const detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    const detailsModalClose = () => this.setState({ detailsModalShow: false });

    // Slider settings for showing only 1 project at a time
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3, // Show only 1 project at a time
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "0",
      autoplay: false,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;

      var sortedProjects = this.props.resumeProjects.sort((a, b) => {
        const dateA = new Date(a.startDate.split(" - ")[0]); // Parse the start date
        const dateB = new Date(b.startDate.split(" - ")[0]); // Parse the start date
        return dateB - dateA; // Sort in descending order
      });
      var projects = sortedProjects.map((project, index) => {
        const isLongTitle = project.title.length > 20; // Threshold for a long title
        return (
          <div key={index} className="px-4">
            <div
              className="foto"
              style={{ cursor: "pointer" }}
              onClick={() => detailsModalShow(project)}
            >
              <div>
                <img
                  src={require(`../images/${project.images[0]}`)}
                  alt="projectImages"
                  style={{
                    width: "100%",
                    height: "230px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    borderColor: "black",
                    borderWidth: "0.5px",
                    borderStyle: "solid",
                    marginBottom: 0,
                  }}
                />
                <span className="project-date">{project.startDate}</span>
                <br />
                <p
                  className="project-title-settings mt-3"
                  style={{
                    fontSize: isLongTitle ? "9px" : "16px", // Smaller font for long titles
                    textAlign: "center",
                  }}
                >
                  {project.title}
                </p>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="section-title text-center mb-12" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <Slider {...sliderSettings}>{projects}</Slider>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;
