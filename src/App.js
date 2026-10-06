import React, { Component } from "react";
import $ from "jquery";
import "./tailwind.css";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import NavigationBar from "./components/Navbar";

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      resumeData: {},
      sharedData: {},
    };
  }

  componentDidMount() {
    this.loadSharedData();
    this.loadResumeFromPath(`res_primaryLanguage.json`);
    document.documentElement.lang = window.$primaryLanguage;
  }

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(`Failed to load ${path}:`, err);
      },
    });
  }

  loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("Failed to load portfolio_shared_data.json:", err);
      },
    });
  }

  render() {
    return (
      <div>
        <a href="#main" className="skip-link">Skip to content</a>
        <NavigationBar />
        <main id="main">
          <Header sharedData={this.state.sharedData.basic_info} />
          <About resumeBasicInfo={this.state.resumeData.basic_info} />
          <Projects
            resumeProjects={this.state.resumeData.projects}
            resumeBasicInfo={this.state.resumeData.basic_info}
          />
          <Experience
            resumeExperience={this.state.resumeData.experience}
            resumeBasicInfo={this.state.resumeData.basic_info}
          />
          <Skills
            sharedSkills={this.state.sharedData.skills}
            resumeBasicInfo={this.state.resumeData.basic_info}
          />
        </main>
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default App;
