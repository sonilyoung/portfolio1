import React, { Component, useEffect, useState } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";

// 1. 사용 가능한 타입 목록 정의
const PARTICLE_TYPES = [
  "circle", 
  "square", 
  "lines", 
  "polygon", 
  "thick", 
  "fountain", 
  //"ball",
  "cobweb", // 추가: 일반적으로 많이 사용되는 타입
];

const Header = (props) => {
  // 2. 현재 ParticlesBg 타입을 관리할 상태 정의
  const [particleType, setParticleType] = useState(PARTICLE_TYPES[0]);

  // 3. 몇 초마다 타입을 변경할지 설정 (예: 10초마다)
  const INTERVAL_SECONDS = 5;

  // 4. 컴포넌트가 마운트될 때 타이머를 설정하고 언마운트될 때 정리
  useEffect(() => {
    // 랜덤 타입 선택 함수
    const selectRandomType = () => {
      const randomIndex = Math.floor(Math.random() * PARTICLE_TYPES.length);
      setParticleType(PARTICLE_TYPES[randomIndex]);
    };

    // 설정된 시간 간격마다 selectRandomType 함수 호출
    const intervalId = setInterval(selectRandomType, INTERVAL_SECONDS * 1000);

    // 컴포넌트가 사라질 때 타이머를 정리 (클린업 함수)
    return () => clearInterval(intervalId);
  }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때만 실행

  if (!props.data) return null;

  const project = props.data.project;
  const github = props.data.github;
  const name = props.data.name;
  const description = props.data.description;

  return (
    <header id="home">
      {/* circle, square, lines, polygon, thick, fountain, custom(컨피그가 필요하므로 제외), ball*/}
      <ParticlesBg 
        type={particleType}
        bg={true} 
        /* 내장 타입(circle, square 등)은 config를 무시하거나 이상하게 동작함
        config={{
          // 입자가 솟아오르는 동작과 관련된 설정 (fountain 유사)
          num: 80, 
          rps: 0.2, // rps 값을 낮춰서 속도를 늦춥니다.
          //v: [0, -0.2], // Y축 속도를 -0.2로 설정 (기존 0.5보다 훨씬 느림)
          size: 2,  // 입자의 크기를 조절합니다.
          move: "out"// 입자가 캔버스 밖으로 나가면 사라지도록 설정합니다.
          //color: ["#999", "#777", "#555"], // 원하는 색상 설정
          // ... 필요에 따라 옵션추가
        }}
        */          
      />

      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>

          <li>
            <a className="smoothscroll" href="#about">
              About
            </a>
          </li>

          <li>
            <a className="smoothscroll" href="#resume">
              Resume
            </a>
          </li>

          <li>
            <a className="smoothscroll" href="#portfolio">
              Works
            </a>
          </li>

          <li>
            <a className="smoothscroll" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          <Fade bottom>
            <h1 className="responsive-headline">{name}</h1>
          </Fade>
          <Fade bottom duration={1200}>
            <h3>{description}.</h3>
          </Fade>
          <hr />
          <Fade bottom duration={2000}>
            <ul className="social">
              <a className="smoothscroll button btn project-btn" href="#portfolio">
                <i className="fa fa-book"></i>Project
              </a>
              {/** 주석
              <a href={github} className="button btn github-btn">
                <i className="fa fa-github"></i>Github
              </a>
                */}
            </ul>
          </Fade>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
}

export default Header;
