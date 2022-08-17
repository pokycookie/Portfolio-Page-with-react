import { useState } from "react";
import BusinessCard from "../components/businessCard";
import SvgText from "../components/svgText";
import submarine from "../img/submarine.svg";
import Background from "../components/background";
import "../scss/initSection.scss";
import "../scss/submarine.scss";

export default function InitSection() {
  const [isFlip, setIsFlip] = useState(false);

  return (
    <div className="initSection _section">
      <div className="textArea">
        <SvgText>HELLO</SvgText>
      </div>
      <div className="cardArea">
        <BusinessCard
          className="front"
          isFlip={isFlip}
          setIsFlip={setIsFlip}
          reverse={true}
        >
          <div className="top">
            <p>황세웅</p>
            <p>JavaScript(+TypeScript) 개발자</p>
          </div>
          <div className="bottom">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/pokycookie"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub 프로필
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://pokycookie.tistory.com/"
              onClick={(e) => e.stopPropagation()}
            >
              Tistory 기술블로그
            </a>
          </div>
        </BusinessCard>
        <BusinessCard className="back" isFlip={isFlip} setIsFlip={setIsFlip}>
          <p></p>
        </BusinessCard>
      </div>
      <button className="introBtn">DIVE!</button>
      <img
        className="submarine"
        src={submarine}
        alt="submarine"
        width={400}
        height={400}
      />
      <Background />
    </div>
  );
}
