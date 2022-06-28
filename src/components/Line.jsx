import React from "react";
import Box from "./Box";
const Line = ({ guess, isEntered, solution }) => {
  guess = Array.from(guess);
  while (guess.length < 5) {
    guess.push(" ");
  }

  return (
    <div className="line">
      {Array.from(guess).map((char, i) => {
        char = char.toUpperCase();
        let className = "box";
        if (isEntered) {
          if (char === solution[i]) {
            className += " success";
          } else if (solution.toString().includes(char)) {
            className += " found";
          } else {
            className += " fail";
          }
        }
        return (
          <Box
            char={char}
            key={i}
            isEntered={isEntered}
            className={className}
          />
        );
      })}
    </div>
  );
};

export default Line;
