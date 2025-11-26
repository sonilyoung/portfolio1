import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";

let id = 0;
class Portfolio extends Component {
  render() {
    if (!this.props.data) return null;

    const projects = this.props.data.projects.map(function (projects) {
      let projectImage = "images/portfolio/" + projects.image;

      return (
        <div key={id++} className="columns portfolio-item">
          <div className="item-wrap">
            <div style={{ textAlign: "center" }}>
              {projects.category}
            </div>            
            <Zmage alt={projects.title} src={projectImage} />
            <div style={{ textAlign: "center" }}>
              {projects.url !== '' ? 
                (
                  <a href={projects.url} title={projects.title} target="_blank" rel="noopener noreferrer">
                    {projects.title}
                  </a>                              
                ) 
                : (<a href="javascript:;alert('폐쇠망 개발로 사이트 정보가 제한되어 있습니다');">{projects.title}</a>)
              }
            </div>
          </div>
        </div>
      );
    });

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>수행 프로젝트</h1>

              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-thirds cf"
              >
                {projects}
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;
