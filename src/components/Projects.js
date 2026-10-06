import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import TechTags from "./TechTags";

const CATEGORY_ORDER = ["Mini-projects", "CS Research", "Startup/Entrepreneurship"];
const CATEGORY_LABELS = {
  "Mini-projects": "Mini-projects",
  "CS Research": "Research",
  "Startup/Entrepreneurship": "Startups",
};

const IMAGE_FALLBACK =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="200"%3E%3Crect fill="%23F4E4DA" width="320" height="200"/%3E%3C/svg%3E';

const categoryOf = (project) => project.category || "Mini-projects";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
      filter: "All",
    };
  }

  openDetails = (project) => {
    this.setState({ detailsModalShow: true, deps: project });
  };

  closeDetails = () => {
    this.setState({ detailsModalShow: false });
  };

  renderFeatured(project) {
    return (
      <article className="featured-card" key={project.title}>
        <div className="featured-card-media">
          <img
            src={project.images[0]}
            alt=""
            width="2912"
            height="1650"
            onError={(e) => {
              e.target.src = IMAGE_FALLBACK;
            }}
          />
        </div>
        <div className="featured-card-body">
          <span className="featured-card-label">Latest</span>
          <h3 className="featured-card-title">
            <button type="button" className="card-trigger" onClick={() => this.openDetails(project)}>
              {project.title}
            </button>
          </h3>
          <p className="card-meta">{project.startDate}</p>
          <p className="featured-card-desc">{project.description}</p>
          <TechTags technologies={project.technologies} />
          <span className="card-cta" aria-hidden="true">
            Read more <i className="fas fa-arrow-right"></i>
          </span>
        </div>
      </article>
    );
  }

  renderCard(project) {
    return (
      <li key={project.title}>
        <article className="project-card">
          <div className="project-card-media">
            <img
              src={project.images[0]}
              alt=""
              width="320"
              height="200"
              loading="lazy"
              onError={(e) => {
                e.target.src = IMAGE_FALLBACK;
              }}
            />
          </div>
          <div className="project-card-body">
            <p className="card-meta">
              {CATEGORY_LABELS[categoryOf(project)]} · {project.startDate}
            </p>
            <h3 className="project-card-title">
              <button type="button" className="card-trigger" onClick={() => this.openDetails(project)}>
                {project.title.trim()}
              </button>
            </h3>
            <TechTags technologies={project.technologies} />
          </div>
        </article>
      </li>
    );
  }

  render() {
    if (!this.props.resumeProjects || !this.props.resumeBasicInfo) {
      return null;
    }

    const sectionName = this.props.resumeBasicInfo.section_name.projects;
    const projects = this.props.resumeProjects;
    const featured = projects.filter((p) => p.featured);
    const rest = projects
      .filter((p) => !p.featured)
      .sort((a, b) => CATEGORY_ORDER.indexOf(categoryOf(a)) - CATEGORY_ORDER.indexOf(categoryOf(b)));
    const filters = ["All", ...CATEGORY_ORDER.filter((c) => rest.some((p) => categoryOf(p) === c))];
    const visible =
      this.state.filter === "All" ? rest : rest.filter((p) => categoryOf(p) === this.state.filter);

    return (
      <section id="portfolio" className="section section-tinted">
        <div className="section-inner">
          <h2 className="section-heading">{sectionName}</h2>

          {featured.map((project) => this.renderFeatured(project))}

          <div className="project-filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                type="button"
                key={f}
                className="filter-chip"
                aria-pressed={this.state.filter === f}
                onClick={() => this.setState({ filter: f })}
              >
                {f === "All" ? "All" : CATEGORY_LABELS[f]}
              </button>
            ))}
          </div>

          <ul className="project-grid">{visible.map((project) => this.renderCard(project))}</ul>
        </div>

        <ProjectDetailsModal
          show={this.state.detailsModalShow}
          onHide={this.closeDetails}
          data={this.state.deps}
        />
      </section>
    );
  }
}

export default Projects;
