import styles from "./Tile.module.css";

const Tile = ({ color, id, handleSelect, selectedTileId, size }) => {
  const border = id == 0 || id == size - 1 ? "4px solid #40363a" : "none";

  const tileStyle = {
    background: `${color}`,
    border: `${border}`,
  };

  return (
    <div
      className={selectedTileId === id ? styles.selected : styles.tile}
      style={tileStyle}
      onClick={() => handleSelect(id)}
    >
      hi
    </div>
  );
};

export default Tile;
