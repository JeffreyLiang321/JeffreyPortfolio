import React, { Component, createRef } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
      selectedCategory: null, // null = folder view, category name = project view
    };
    this.projectsScrollRef = createRef();
  }

  handleFolderClick = (category) => {
    this.setState({ selectedCategory: category });
  };

  handleBackClick = () => {
    this.setState({ selectedCategory: null });
  };

  scrollLeft = () => {
    if (this.projectsScrollRef.current) {
      const cardWidth = 320 + 24; // card width + gap
      this.projectsScrollRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  scrollRight = () => {
    if (this.projectsScrollRef.current) {
      const cardWidth = 320 + 24; // card width + gap
      this.projectsScrollRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };

  render() {
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });
    
    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      
      // Group projects by category
      const groupedProjects = {};
      this.props.resumeProjects.forEach((project) => {
        const category = project.category || "Mini-projects";
        if (!groupedProjects[category]) {
          groupedProjects[category] = [];
        }
        groupedProjects[category].push(project);
      });

      // Define category order
      const categoryOrder = ["Mini-projects", "CS Research", "Startup/Entrepreneurship"];

      // If a category is selected, show projects view
      if (this.state.selectedCategory) {
        const projects = groupedProjects[this.state.selectedCategory] || [];
        const projectCards = projects.map((project) => {
          return (
            <div
              className="project-card-horizontal"
              key={project.title}
              onClick={() => detailsModalShow(project)}
            >
              <div className="project-card-image-container">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="project-card-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="240"%3E%3Crect fill="%23ddd" width="320" height="240"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="project-card-date-overlay">
                  {project.startDate}
                </div>
              </div>
              <div className="project-card-content">
                <h3 className="project-card-title">{project.title}</h3>
              </div>
            </div>
          );
        });

        return (
          <section id="portfolio">
            <div className="col-md-12">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ color: "black", margin: 0 }}>
                  <span>{sectionName} ({this.state.selectedCategory})</span>
                </h1>
                <button 
                  className="back-button"
                  onClick={this.handleBackClick}
                >
                  ← Back to Folders
                </button>
              </div>
              <div className="projects-carousel-wrapper">
                <button 
                  className="carousel-arrow carousel-arrow-left"
                  onClick={this.scrollLeft}
                  aria-label="Scroll left"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div 
                  className="projects-carousel-container"
                  ref={this.projectsScrollRef}
                >
                  <div className="projects-carousel-inner">
                    {projectCards}
                  </div>
                </div>
                <button 
                  className="carousel-arrow carousel-arrow-right"
                  onClick={this.scrollRight}
                  aria-label="Scroll right"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
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

      // Otherwise, show folder view
      const folders = categoryOrder.map((category) => {
        const projectCount = (groupedProjects[category] || []).length;
        return (
          <div
            key={category}
            className="folder-item col-sm-12 col-md-4"
            onClick={() => this.handleFolderClick(category)}
            style={{ cursor: 'pointer', marginBottom: '2rem' }}
          >
            <div className="folder-container">
              <div className="folder-icon">
                <FontAwesomeIcon icon={faFolder} style={{ fontSize: '4rem', color: '#4a90e2' }} />
              </div>
              <h3 className="folder-title">{category}</h3>
              <p className="folder-count">{projectCount} {projectCount === 1 ? 'project' : 'projects'}</p>
            </div>
          </div>
        );
      });

      return (
        <section id="portfolio">
          <div className="col-md-12">
            <h1 className="section-title" style={{ color: "black" }}>
              <span>{sectionName}</span>
            </h1>
            <div className="col-md-12 mx-auto">
              <div className="row mx-auto folders-row">
                {folders}
              </div>
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

    return null;
  }
}

export default Projects;
