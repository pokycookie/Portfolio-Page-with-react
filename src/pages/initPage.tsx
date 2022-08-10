import { useState } from "react";
import Background from "../components/background";
import BusinessCard from "../components/businessCard";
import SvgText from "../components/svgText";

export default function InitPage() {
  const [isFlip, setIsFlip] = useState(false);
  const [dive, setDive] = useState<boolean>(false);

  const diveHandler = () => {
    setDive((prev) => (prev ? false : true));
  };

  return (
    <div className="initPage">
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
            <p>JavaScript 개발자</p>
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
      <button className="introBtn" onClick={diveHandler}>
        DIVE!
      </button>
      <Background dive={dive} />
    </div>
  );
}
