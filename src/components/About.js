import React, { Component } from "react";

class About extends Component {
  render() {
    if (!this.props.resumeBasicInfo) {
      return null;
    }

    const sectionName = this.props.resumeBasicInfo.section_name.about;
    const paragraphs = this.props.resumeBasicInfo.description.split("\n\n");
    const facts = this.props.resumeBasicInfo.quick_facts || [];

    return (
      <section id="about" className="section">
        <div className="section-inner">
          <h2 className="section-heading">{sectionName}</h2>
          <div className="about-grid">
            <div className="about-body">
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            <dl className="about-facts">
              {facts.map((fact) => (
                <div className="about-fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
