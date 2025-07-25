import React from "react";

const LoginButton = ({ text = "Login", type = "button", onClick }) => {
  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap");

        .neon-button {
          position: relative;
          display: inline-block;
          padding: 25px 30px;
          margin: 40px 0;
          color: #03e9f4;
          background: none;
          border: none;
          text-transform: uppercase;
          transition: 0.5s;
          letter-spacing: 4px;
          overflow: hidden;
          font-family: "Raleway", sans-serif;
          font-weight: bold;
        }

        .neon-button:hover {
          background: #03e9f4;
          color: #050801;
          box-shadow: 0 0 5px #03e9f4,
                      0 0 25px #03e9f4,
                      0 0 50px #03e9f4,
                      0 0 200px #03e9f4;
          -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
        }

        .neon-button span {
          position: absolute;
          display: block;
        }

        .neon-button span:nth-child(1) {
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #03e9f4);
          animation: animate1 1s linear infinite;
        }

        @keyframes animate1 {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        .neon-button span:nth-child(2) {
          top: -100%;
          right: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent, #03e9f4);
          animation: animate2 1s linear infinite;
          animation-delay: 0.25s;
        }

        @keyframes animate2 {
          0% { top: -100%; }
          50%, 100% { top: 100%; }
        }

        .neon-button span:nth-child(3) {
          bottom: 0;
          right: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(270deg, transparent, #03e9f4);
          animation: animate3 1s linear infinite;
          animation-delay: 0.5s;
        }

        @keyframes animate3 {
          0% { right: -100%; }
          50%, 100% { right: 100%; }
        }

        .neon-button span:nth-child(4) {
          bottom: -100%;
          left: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(360deg, transparent, #03e9f4);
          animation: animate4 1s linear infinite;
          animation-delay: 0.75s;
        }

        @keyframes animate4 {
          0% { bottom: -100%; }
          50%, 100% { bottom: 100%; }
        }
      `}</style>

      <button type={type} onClick={onClick} className="neon-button">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {text}
      </button>
    </>
  );
};

export default LoginButton;
