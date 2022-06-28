import { useFormik } from "formik";
import { useState, useEffect } from "react";
import wordBank from "../data/wordBank";
import Line from "./Line";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const words = wordBank;
const linkedinLink = "https://www.linkedin.com/in/beran-santur-810b19206/";
const githubLink = "https://github.com/BeranSantur";

const Board = () => {
  const [guesses, setGuesses] = useState(Array(6).fill(" "));
  const [solution, setSolution] = useState("");
  const [gameState, setGameState] = useState({
    isGameWon: false,
    isGameLost: false,
  });
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  //handling with formik
  const initialValues = { currentGuess: "" };
  const onSubmit = (values, formikProps) => {
    if (values.currentGuess.toUpperCase() === solution) {
      setGameState((prev) => ({ ...prev, isGameWon: true }));
    }
    const newGuesses = [...guesses];
    const nextEmptySlot = guesses.findIndex((guess) => guess === " ");
    newGuesses[nextEmptySlot] = formik.values.currentGuess;
    setGuesses(newGuesses);
    formikProps.resetForm();
  };
  const formik = useFormik({ initialValues, onSubmit });

  useEffect(() => {
    //return -1 if any slot is not found
    const nextEmptySlot = guesses.findIndex((guess) => guess === " ");
    if (nextEmptySlot === -1 && gameState.isGameWon === false) {
      setGameState((prev) => ({ ...prev, isGameLost: true }));
    }
  }, [formik.values.currentGuess, gameState.isGameWon, guesses]);

  const assignSolution = () => {
    //getting data from word bank randomly
    const randomisedWord = words[Math.floor(Math.random() * words.length)];
    setSolution(randomisedWord);
  };

  useEffect(() => {
    assignSolution();
  }, []);

  return (
    <div className="board">
      {gameState.isGameLost && (
        <div className="gameLost">
          <h1>YOU'VE LOST</h1>
          <p>Correct word was {solution}</p>
          <p>Wanna play again? </p>
          <button
            className="button"
            onClick={() => {
              setGuesses(Array(6).fill(" "));
              setGameState((prev) => ({ ...prev, isGameLost: false }));
              assignSolution();
            }}
          >
            Restart
          </button>
        </div>
      )}
      {gameState.isGameWon && (
        <div className="gameWon">
          <h1>YOU'VE WON</h1> <p>You've won the game wanna try again?</p>
          <button
            className="button"
            onClick={() => {
              setGuesses(Array(6).fill(" "));
              setGameState((prev) => ({ ...prev, isGameWon: false }));
              assignSolution();
            }}
          >
            Restart
          </button>
        </div>
      )}
      <div className="info">
        <button
          onClick={(event) => {
            event.preventDefault();
            setIsInfoClicked(true);
          }}
        >
          How to play?
        </button>
      </div>
      {isInfoClicked && (
        <div className="howToPlay">
          <div className="navLine">
            <span>Correct position in correct word</span>
            <div className="greenBox"></div>
          </div>

          <div className="navLine">
            <span>Incorrect position in correct word</span>
            <div className="blueBox"></div>
          </div>

          <div className="navLine">
            <span>Incorrect position in incorrect word</span>
            <div className="redBox"></div>
          </div>
          <button onClick={() => setIsInfoClicked(false)}>OK</button>
        </div>
      )}

      <h1 className="boardHeader">Wordle Clone</h1>
      {guesses.map((guess, index) => {
        let isCurrentGuess =
          index === guesses.findIndex((guess) => guess === " ");
        return (
          <Line
            key={index}
            guess={
              isCurrentGuess ? formik.values.currentGuess.slice(0, 5) : guess
            }
            isEntered={guess !== " "}
            solution={solution}
          />
        );
      })}
      <form className="form" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="currentGuess"
          onChange={formik.handleChange}
          value={formik.values.currentGuess}
          className="textBox"
        />
        <button
          className="button"
          type="submit"
          disabled={
            !formik.dirty ||
            formik.values.currentGuess.length < 5 ||
            formik.values.currentGuess.length > 5 ||
            gameState.isGameLost === true ||
            gameState.isGameWon === true
          }
        >
          Click me
        </button>
      </form>
      <div className="footer">
        <a href={githubLink} rel="noreferrer" target="_blank">
          <FaGithub className="icons" size={"1.3rem"} />
        </a>
        <a href={linkedinLink} target="_blank" rel="noreferrer">
          <FaLinkedin className="icons" size={"1.3rem"} />
        </a>
      </div>
    </div>
  );
};

export default Board;
