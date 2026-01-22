import React, { Component } from "react";

class Skills extends Component {
  render() {
    if (!this.props.sharedSkills || !this.props.resumeBasicInfo) {
      return null;
    }

    var sectionName = this.props.resumeBasicInfo.section_name.skills;
    var skills = this.props.sharedSkills.icons.map(function (skills, i) {
      return (
        <li className="list-inline-item" key={i}>
          <span>
            <div className="text-center skills-tile">
              <i className={skills.class} style={{ fontSize: "300%" }}>
                <p
                  className="text-center"
                  style={{ fontSize: "30%", marginTop: "4px" }}
                >
                  {skills.name}
                </p>
              </i>
            </div>
          </span>
        </li>
      );
    });

    // Create duplicate list for seamless loop
    var duplicateSkills = this.props.sharedSkills.icons.map(function (skills, i) {
      return (
        <li className="list-inline-item mx-3" key={`duplicate-${i}`}>
          <span>
            <div className="text-center skills-tile">
              <i className={skills.class} style={{ fontSize: "300%" }}>
                <p
                  className="text-center"
                  style={{ fontSize: "30%", marginTop: "4px" }}
                >
                  {skills.name}
                </p>
              </i>
            </div>
          </span>
        </li>
      );
    });

    return (
      <section id="skills">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="skills-section-title">
              <span className="text-white">{sectionName}</span>
            </h1>
          </div>
          <div className="skills-scroll-container">
            <div className="skills-scroll-wrapper">
              <ul className="skills-scroll-list">{skills}</ul>
              {/* Duplicate for seamless loop */}
              <ul className="skills-scroll-list">{duplicateSkills}</ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;
