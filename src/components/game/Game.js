import Board from "@/components/board/Board";
import Button from "@/components/button/Button";
import { useState } from "react";
import styles from "./Game.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const OPTION_BUTTONS = [
  { id: "1", value: 3 },
  { id: "2", value: 5 },
  { id: "3", value: 10 },
];

const Game = () => {
  const [gameOver, setGameOver] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [activeButton, setActiveButton] = useState("1");
  const [boardSize, setBoardSize] = useState(3);
  const [seeHint, setSeeHint] = useState(false);

  const handleClick = (id) => {
    setActiveButton(id);
    let index = OPTION_BUTTONS.findIndex((button) => button.id === id);
    setBoardSize(OPTION_BUTTONS[index].value);
    console.log(OPTION_BUTTONS[index].value);
  };

  if (gameOver) {
    return (
      <div className={styles.gameContainer}>
        <p className={styles.title}>Swap tiles to make a gradient!</p>
        <p className={styles.title}>
          If you get stuck, use a hint{" "}
          <AiOutlineEye className={styles.inlineIcon} />
        </p>
        <p className={styles.title}>Pick a board size</p>
        <div className={styles.buttonContainer}>
          {OPTION_BUTTONS.map(({ id, value }) => (
            <Button
              id={id}
              key={id}
              value={value}
              handleClick={handleClick}
              activeButton={activeButton}
            />
          ))}
        </div>
        <button className="text-button" onClick={() => setGameOver(false)}>
          <p>START</p>
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.widget}>
          <button className="icon-button" onClick={() => setGameOver(true)}>
            <IoIosArrowBack className="icon" />
          </button>
          <p>{isSolved ? "NICE!" : ""}</p>
          <button className="icon-button" onClick={() => setSeeHint(!seeHint)}>
            {seeHint ? (
              <AiOutlineEyeInvisible className="icon" />
            ) : (
              <AiOutlineEye className="icon" />
            )}
          </button>
        </div>
        <Board seeHint={seeHint} size={boardSize} solveHandler={setIsSolved} />
      </div>
    );
  }
};

export default Game;
