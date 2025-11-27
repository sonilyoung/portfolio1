import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";

let id = 0;
class Portfolio extends Component {
  render() {
    if (!this.props.data) return null;

    const projects = this.props.data.projects.map(function (projects) {
      let projectImage = "images/portfolio/" + projects.image;

      // projects.title에서 <br> 태그를 제거하여 title 속성에 사용할 텍스트
      const titleTextOnly = projects.title.replace(/<br\s*\/?>/gi, ' ');

      // dangerouslySetInnerHTML 객체 생성
      const titleHtml = { __html: projects.title };

      return (
        <div key={id++} className="columns portfolio-item">
          <div className="item-wrap">
            <div style={{ textAlign: "center" }}>
              {projects.category}
            </div>            
            <div className="image-container"> {/* width 스타일이 먹지 않아서 새로운 래퍼 클래스 추가 */}
              <Zmage alt={projects.title} src={projectImage} />
            </div>
            <div style={{ textAlign: "center" }}>
              {projects.url !== '' ? 
                (
                  <a 
                    href={projects.url} 
                    title={titleTextOnly} // <br> 제거된 텍스트 사용
                    target="_blank" rel="noopener noreferrer">
                    {/* 여기에 dangerouslySetInnerHTML 적용 */}
                    <span dangerouslySetInnerHTML={titleHtml} />
                  </a>                              
                ) 
                : (<a href="javascript:;alert('폐쇠망 개발로 사이트 정보가 제한되어 있습니다');">
                  <span dangerouslySetInnerHTML={titleHtml} />
                </a>)
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
              <h1>
                <span>
                  <font color="black">수행 프로젝트</font>
                </span>
              </h1>
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
