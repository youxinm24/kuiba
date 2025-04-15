import React from "react";
import styled from "styled-components";

const Button = ({ onClick, isGlowing }) => {
  return (
    <StyledWrapper isGlowing={isGlowing}>
      <button className="button10" onClick={onClick}>
        <div className="rings-container">
          <div className="outer-ring">
            <div className="outer-ring-inner"></div>
          </div>
          <div className="inner-ring">
            <div className="inner-ring-inner"></div>
          </div>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  .button10 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
  }

  .rings-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .outer-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 95%;
    height: 95%;
    border-radius: 50%;
    background: ${({ isGlowing }) => isGlowing ? 'rgba(181, 245, 246, 0.1)' : '#000'};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }

  .outer-ring-inner {
    position: absolute;
    width: 95%;
    height: 95%;
    border-radius: 50%;
    border: 2px solid #B5F5F6;
    opacity: ${({ isGlowing }) => isGlowing ? 1 : 0.3};
    transition: all 0.3s ease;
    box-shadow: ${({ isGlowing }) => isGlowing ? '0 0 20px #B5F5F6' : 'none'};
  }

  .inner-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 79%;
    height: 79%;
    border-radius: 50%;
    background: ${({ isGlowing }) => isGlowing ? 'rgba(181, 245, 246, 0.1)' : '#000'};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }

  .inner-ring-inner {
    position: absolute;
    width: 79%;
    height: 79%;
    border-radius: 50%;
    border: 2px solid #B5F5F6;
    opacity: ${({ isGlowing }) => isGlowing ? 0.8 : 0.2};
    transition: all 0.3s ease;
    box-shadow: ${({ isGlowing }) => isGlowing ? '0 0 15px #B5F5F6' : 'none'};
  }

  .button10:hover .outer-ring {
    background: rgba(181, 245, 246, 0.05);
  }

  .button10:hover .inner-ring {
    background: rgba(181, 245, 246, 0.05);
  }

  .button10:hover .outer-ring-inner {
    opacity: 1;
    box-shadow: 0 0 25px #B5F5F6;
  }

  .button10:hover .inner-ring-inner {
    opacity: 0.9;
    box-shadow: 0 0 20px #B5F5F6;
  }

  .button10:active .outer-ring-inner,
  .button10:active .inner-ring-inner {
    transform: scale(0.98);
  }

  /* 添加发光动画效果 */
  @keyframes glow {
    0% {
      box-shadow: 0 0 15px #B5F5F6;
      background: rgba(181, 245, 246, 0.1);
    }
    50% {
      box-shadow: 0 0 25px #B5F5F6;
      background: rgba(181, 245, 246, 0.2);
    }
    100% {
      box-shadow: 0 0 15px #B5F5F6;
      background: rgba(181, 245, 246, 0.1);
    }
  }

  @keyframes borderGlow {
    0% {
      box-shadow: 0 0 15px #B5F5F6;
    }
    50% {
      box-shadow: 0 0 25px #B5F5F6;
    }
    100% {
      box-shadow: 0 0 15px #B5F5F6;
    }
  }

  ${({ isGlowing }) => isGlowing && `
    .outer-ring {
      animation: glow 2s infinite;
    }
    .inner-ring {
      animation: glow 2s infinite reverse;
    }
    .outer-ring-inner {
      animation: borderGlow 2s infinite;
    }
    .inner-ring-inner {
      animation: borderGlow 2s infinite reverse;
    }
  `}
`;

export default Button;
