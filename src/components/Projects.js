import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
    };
  }

  render() {
    const CustomPrevArrow = (props) => {
      const { className, style, onClick } = props;
      return (
        <button
          className={className}
          style={{
            ...style,
            left: "-10px", // Move left arrow inside the screen
            zIndex: 2,
            fontSize: "20px",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "50%",
          }}
          onClick={onClick}
        >
          ◀
        </button>
      );
    };
    
    const CustomNextArrow = (props) => {
      const { className, style, onClick } = props;
      return (
        <button
          className={className}
          style={{
            ...style,
            right: "-10px", // Move right arrow inside the screen
            zIndex: 2,
            fontSize: "20px",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "50%",
          }}
          onClick={onClick}
        >
          ▶
        </button>
      );
    };
    
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
      prevArrow: <CustomPrevArrow/>,
      nextArrow: <CustomNextArrow/>,
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
      var projects = this.props.resumeProjects.map(function (projects) {
        return (
          <div key={index} className="px-4">
            <div
              className="foto"
              style={{ cursor: "pointer" }}
              onClick={() => detailsModalShow(project)}
            >
              <div>
                <img
                  // src={require(`../images/beya1.png`)}
                  src={projects.images[0]}
                  // src={require(`../images/${project.images[0]}`)}
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
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
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
