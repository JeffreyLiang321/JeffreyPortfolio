import React, { Component } from "react";

class Experience extends Component {
  render() {
    if (!this.props.resumeExperience || !this.props.resumeBasicInfo) {
      return null;
    }

    const sectionName = this.props.resumeBasicInfo.section_name.experience;

    return (
      <section id="resume" className="section">
        <div className="section-inner">
          <h2 className="section-heading">{sectionName}</h2>
          <ol className="experience-list">
            {this.props.resumeExperience.map((work) => (
              <li className="experience-item" key={`${work.company}-${work.title}`}>
                <div className="experience-aside">
                  <p className="experience-dates">{work.years}</p>
                  <p className="experience-kind">{work.mainTech.join(", ")}</p>
                </div>
                <div className="experience-main">
                  <div className="experience-heading">
                    <img
                      className="experience-logo"
                      src={require(`../images/${work.image}`)}
                      alt=""
                      width="48"
                      height="48"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="experience-title">{work.title}</h3>
                      <p className="experience-company">{work.company}</p>
                    </div>
                  </div>
                  <ul className="experience-points">
                    {work.technologies.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
}

export default Experience;
