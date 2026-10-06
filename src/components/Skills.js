import React, { Component } from "react";

class Skills extends Component {
  render() {
    if (!this.props.sharedSkills || !this.props.resumeBasicInfo) {
      return null;
    }

    const sectionName = this.props.resumeBasicInfo.section_name.skills;
    const groups = [];
    this.props.sharedSkills.icons.forEach((skill) => {
      const name = skill.group || "Other";
      let group = groups.find((g) => g.name === name);
      if (!group) {
        group = { name, skills: [] };
        groups.push(group);
      }
      group.skills.push(skill);
    });

    return (
      <section id="skills" className="section section-tinted">
        <div className="section-inner">
          <h2 className="section-heading">{sectionName}</h2>
          <div className="skills-groups">
            {groups.map((group) => (
              <div key={group.name} className="skills-group">
                <h3 className="skills-group-title">{group.name}</h3>
                <ul className="skills-list">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="skill-chip">
                      <i className={skill.class} aria-hidden="true"></i>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;
