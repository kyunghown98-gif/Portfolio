import React, { useState, useEffect, useRef } from "react";
import "../css/profile.css";

// ── GLITCH TITLE ───────────────────────────────────
const GlitchTitle = ({ text }) => (
  <span className="glitch-title" data-text={text}>
    {text}
  </span>
);

// ── SECTION HEADER ─────────────────────────────────
const SectionHeader = ({ title }) => (
  <div className="section-header">
    <GlitchTitle text={title} />
  </div>
);

// ── SKILL TAG ──────────────────────────────────────
const SkillTag = ({ label }) => (
  <span className="skill-tag">{label}</span>
);

// ── SKILLS DATA (DESIGN 카테고리 추가됨) ──────────────
const skills = [
  { cat: "MARKUP", items: ["HTML5", "CSS3"] },
  { cat: "SCRIPT", items: ["JavaScript ES6+", "React", "DOM API"] },
  { cat: "DESIGN", items: ["Photoshop", "Illustrator", "Figma"] }, // << 추가된 부분
  { cat: "TOOL", items: ["Git/GitHub", "VS Code"] },
  { cat: "ETC", items: ["반응형 웹", "REST API", "웹 접근성"] },
];

// ── INFO DATA ──────────────────────────────────────
const infoData = [
  ["NAME", "박경훈"],
  ["DOB", "1998.09.03"],
  ["LOCATION", "DAEGU, KR"],
  ["MAIL", "kyunghown98@naver.com"],
];

// ── EDUCATION DATA ─────────────────────────────────
const educationData = [
  ["2022", "영남이공대 자동차학과 졸업"],
  ["2025", "웹 퍼블리싱 과정 수료"],
  ["2025", "웹개발디자인기능사 취득"],
  ["2026", "(산대특)AI&React 활용 스마트시티웨더 구축 리퍼블리셔 양성"],
];

// ── PROFILE SECTION ────────────────────────────────
const Profile = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ABOUT_ME"
      className={`profile-section ${visible ? "visible" : ""}`}
    >
      <SectionHeader title="ABOUT_ME" />

      <div className="profile-grid">
        {/* Sidebar */}
        <div className="profile-sidebar">
          {/* Photo Box */}
          <div className="photo-box">
            <img src="./img/사진3.png" alt="사진" /> 
            <span></span>
          </div>

          {/* Info Rows */}
          
          {infoData.map(([key, value]) => (
            <div key={key} className="info-row">
              <span className="info-label">{key}</span>
              <span className="info-value">{value}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="profile-content">
          {/* Introduction */}
          <div className="intro-box">
            <span className="intro-label">&gt;&gt; INTRODUCTION</span>
            <p className="intro-text">
              사용자 경험을 최우선으로 생각하는{" "}
              <span className="highlight">웹 퍼블리셔</span>입니다.
              <br />
              HTML, CSS, JavaScript를 기반으로 보기 좋고 사용하기 편한 웹 화면을 구현하며,
              <br />
              디테일한 완성도와 꾸준한 성장을 중요하게 생각합니다.
            </p>
          </div>

          {/* Skills */}
          <div className="skills-section">
            <span className="section-sublabel">&gt;&gt; TECH STACK</span>
            {skills.map((group, gi) => (
              <div
                key={gi}
                className={`skill-row ${visible ? "visible" : ""}`}
                style={{ transitionDelay: `${gi * 0.1}s` }}
              >
                <span className="skill-category">{group.cat}</span>
                <div className="skill-tags">
                  {group.items.map((item, ii) => (
                    <SkillTag key={ii} label={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="education-section">
            <span className="section-sublabel">&gt;&gt; EDUCATION &amp; CERT</span>
            {educationData.map(([year, name], index) => (
              <div key={`${year}-${index}`} className="education-row">
                <span className="education-year">{year}</span>
                <span className="education-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;