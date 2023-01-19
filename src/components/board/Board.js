import { useEffect, useState } from "react";
import Tile from "../tile/Tile";
import styles from "./Board.module.css";

const Board = ({ size, seeHint, solveHandler }) => {
  const [boardState, setBoardState] = useState({
    board: [],
    displayedBoard: [],
    selectedTile: false,
    selectedTileId: null,
  });

  const boardStyle = {
    gridTemplateColumns: `repeat(${size}, 1fr)`,
  };

  //generate random color
  const generateColor = () => {
    let randomColor = [];
    for (let i = 0; i < 3; i++) {
      randomColor.push(Math.floor(Math.random() * 100));
    }
    return randomColor;
  };

  //create a single array of colors
  const createColorsArray = (first, last) => {
    let colorsArray = [];
    for (let i = 0; i < size; i++) {
      let color = [];
      for (let j = 0; j < 3; j++) {
        color.push(
          first[j] - Math.floor((first[j] - last[j]) / (size - 1)) * i
        );
      }
      colorsArray.push(color);
    }
    return colorsArray;
  };

  //create a board of colors
  const createBoard = () => {
    let colorsBoard = [];
    let board = [];

    let firstColumn = createColorsArray(generateColor(), generateColor());
    let lastColumn = createColorsArray(generateColor(), generateColor());

    for (let i = 0; i < size; i++) {
      colorsBoard.push(createColorsArray(firstColumn[i], lastColumn[i]));
    }

    let flatColorBoard = [].concat(...colorsBoard);

    //fill the board with color objects
    for (let i = 0; i < flatColorBoard.length; i++) {
      board.push({ id: i, color: colorToRgb(flatColorBoard[i]) });
    }
    return board;
  };

  //shuffle board tiles
  const randomizeBoard = (board) => {
    let randomdBoard = [];
    //save the first tile
    randomdBoard.push(board[0]);
    //shuffle the rest
    let shuffledBoard = board.slice(1).sort((a, b) => 0.5 - Math.random());
    return (randomdBoard = [...randomdBoard, ...shuffledBoard]);
  };

  //compare two boards
  const compare = (board1, board2) => {
    if (board1.length !== board2.length) {
      return false;
    }
    for (let i = 0; i < board1.length; i++) {
      if (board1[i].id !== board2[i].id) {
        return false;
      }
    }
    return true;
  };

  //handle tile selection
  const handleSelect = (id) => {
    if (id == 0 || id == size - 1) {
      return;
    } else {
      if (boardState.selectedTile) {
        swapTiles(boardState.selectedTileId, id);
      } else {
        setBoardState({
          ...boardState,
          selectedTile: true,
          selectedTileId: id,
        });
      }
    }
  };

  //swap selected tiles
  const swapTiles = (id1, id2) => {
    let newTiles = boardState.board.slice();
    let index1 = boardState.board.findIndex((tile) => tile.id === id1);
    let index2 = boardState.board.findIndex((tile) => tile.id === id2);
    let tile1 = { ...newTiles[index1] };
    let tile2 = { ...newTiles[index2] };
    newTiles[index2] = tile1;
    newTiles[index1] = tile2;

    if (compare(newTiles, boardState.solvedBoard)) {
      solveHandler(true);
    }

    setBoardState({
      ...boardState,
      board: newTiles,
      selectedTile: false,
      selectedTileId: null,
    });
  };

  //convert a color array into css
  const colorToRgb = (color) => {
    return `rgb(${color[0]}%,${color[1]}%,${color[2]}%)`;
  };

  //create a board after first render
  useEffect(() => {
    solveHandler(false);
    let solvedBoard = createBoard();
    let randomBoard = randomizeBoard(solvedBoard);
    //swap top right tile back into place
    let index1 = size - 1;
    let index2 = randomBoard.findIndex((tile) => tile.id === size - 1);
    let tile1 = { ...randomBoard[index1] };
    let tile2 = { ...randomBoard[index2] };
    randomBoard[index2] = tile1;
    randomBoard[index1] = tile2;

    setBoardState({
      ...boardState,
      board: randomBoard,
      solvedBoard: solvedBoard,
    });
  }, []);

  return (
    <div className={styles.board} style={boardStyle}>
      {(seeHint ? boardState.solvedBoard : boardState.board).map((tile) => (
        <Tile
          id={tile.id}
          key={tile.id}
          color={tile.color}
          handleSelect={handleSelect}
          selectedTileId={boardState.selectedTileId}
          size={size}
        />
      ))}
    </div>
  );
};

export default Board;
