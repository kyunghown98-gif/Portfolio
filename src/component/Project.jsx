import React, { useState, useEffect, useRef } from "react";
import "../css/project.css";

// ── PROJECT DATA ───────────────────────────────────
const projectsData = [
  {
    idx: "01",
    title: "LOTTE HOTELS CLONE",
    filename: "LOTTE_HOTELS",
    status: "COMPLETE",
    date: "2025.02",
    desc: "복잡한 드롭다운 애니메이션(clip-path, backdrop-filter, cubic-bezier)과 Swiper.js 슬라이더 인터랙션을 구현한 호텔 사이트 클론. 프로모션 카테고리 필터링과 분할 카드 레이아웃, 반응형 대응까지 완성한 실전 클론 코딩 프로젝트.",
    tech: ["REACT", "SWIPER.JS", "CSS3", "RESPONSIVE"],
    link: "#",
    image: "./img/lotte.png",
  },
  {
    idx: "02",
    title: "WEATHER APP",
    filename: "WEATHER_SYS.app",
    status: "ACTIVE",
    date: "2026.02",
    desc: "OpenWeatherMap API 기반의 실시간 날씨 애플리케이션. 현재/시간별/주간 예보, 도시 관리, Swiper.js 시간별 슬라이더, 다크/라이트 테마 전환, 반응형 멀티 브레이크포인트 레이아웃과 미니게임(가위바위보, 숫자맞추기, 반응속도, 메모리게임)을 포함.",
    tech: ["REACT", "REDUX TOOLKIT", "OPENWEATHER API", "CSS VARIABLES"],
    link: "https://kyunghown98-gif.github.io/weather/",
    image: "./img/weather.png",
    git:"https://github.com/kyunghown98-gif/weather"
  },
  {
    idx: "03",
    title: "MATRIX PORTFOLIO",
    filename: "MATRIX_FOLIO",
    status: "IN_PROGRESS",
    date: "2026.03",
    desc: "매트릭스 컨셉의 인터랙티브 포트폴리오 사이트. GSAP ScrollTrigger 기반 시네마틱 씬 전환, Canvas 디지털 레인 이펙트, 글리치 타이포그래피, 스크램블 텍스트 애니메이션 등 몰입감 있는 인터랙션 구현.",
    tech: ["REACT", "GSAP", "CANVAS", "UNICORNSTUDIO"],
    link: "#",
    image: "./img/portfolio.png",
  },
];

// ── SECTION HEADER ─────────────────────────────────
const SectionHeader = ({ title }) => (
  <div className="section-header">
    <span className="glitch-title" data-text={title}>
      {title}
    </span>
  </div>
);

// ── PROJECTS COMPONENT ─────────────────────────────
const Project = () => {
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | loading | typing | done
  const [typedText, setTypedText] = useState("");
  const [showExtras, setShowExtras] = useState(false);
  const sectionRef = useRef();
  const typeRef = useRef(null);

  // Intersection Observer
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

  // 프로젝트 전환 시 타이핑 효과
  useEffect(() => {
    if (!visible) return;

    setTypedText("");
    setShowExtras(false);
    setPhase("loading");

    const loadTimer = setTimeout(() => {
      setPhase("typing");
    }, 600);

    return () => {
      clearTimeout(loadTimer);
      if (typeRef.current) clearInterval(typeRef.current);
    };
  }, [activeIdx, visible]);

  // 타이핑 인터벌
  useEffect(() => {
    if (phase !== "typing") return;

    const desc = projectsData[activeIdx].desc;
    let i = 0;
    setTypedText("");

    typeRef.current = setInterval(() => {
      i++;
      setTypedText(desc.slice(0, i));
      if (i >= desc.length) {
        clearInterval(typeRef.current);
        setShowExtras(true);
        setPhase("done");
      }
    }, 15);

    return () => {
      if (typeRef.current) clearInterval(typeRef.current);
    };
  }, [phase, activeIdx]);

  const data = projectsData[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`prj-section ${visible ? "visible" : ""}`}
    >
      <SectionHeader title="PROJECTS" />

      <div className="prj-terminal">
        {/* 터미널 헤더 */}
        <div className="prj-term-header">
          <span className="prj-term-title">
            SYS.ADMIN // PROJECT_ARCHIVE
          </span>
          <span className="prj-blink">CONNECTION SECURE</span>
        </div>

        {/* 터미널 바디 */}
        <div className="prj-term-body">
          {/* 좌측 파일 리스트 */}
          <div className="prj-file-list">
            <div className="prj-dir-title">&gt; root/projects/</div>
            {projectsData.map((item, i) => (
              <div
                key={i}
                className={`prj-file-item ${activeIdx === i ? "active" : ""}`}
                onClick={() => {
                  if (activeIdx !== i) {
                    if (typeRef.current) clearInterval(typeRef.current);
                    setActiveIdx(i);
                  }
                }}
              >
                {item.idx}_{item.filename}
              </div>
            ))}
          </div>

          {/* 우측 뷰어 */}
          <div className="prj-viewer">
            {phase === "loading" && (
              <div className="prj-loading">
                DECRYPTING DATA... <span className="prj-blink">_</span>
              </div>
            )}

            {phase !== "loading" && (
              <div className="prj-viewer-content">
                <h3 className="prj-glitch" data-text={data.title}>
                  {data.title}
                </h3>

                <div
                  className={`prj-img-container ${showExtras ? "show" : ""}`}
                >
                  <img
                    src={data.image}
                    alt={data.title}
                    className="prj-img"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/800x400/050505/00ff41?text=IMAGE_UNAVAILABLE";
                    }}
                  />
                  <div className="prj-img-scanline" />
                </div>

                <div className="prj-meta">
                  STATUS: [{data.status}]
                  <br />
                  TIMESTAMP: {data.date}
                  <br />
                  AUTHORIZATION: REQUIRED
                </div>

                <p className="prj-desc">
                  {typedText}
                  {phase === "typing" && <span className="prj-cursor" />}
                </p>

                <div className={`prj-extras ${showExtras ? "show" : ""}`}>
                  <div className="prj-tech-tags">
                    <span className="prj-tech-label">&gt; TECH_STACK:</span>
                    <div className="prj-tags-row">
                      {data.tech.map((t, ti) => (
                        <span key={ti} className="prj-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a href={data.link} className="prj-launch-btn">
                    EXECUTE_PROGRAM()
                  </a>
                  <a href={data.git} className="prj-launch-btn">
                    git_hub()
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;