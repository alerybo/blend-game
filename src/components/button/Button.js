const Button = ({ id, value, handleClick, activeButton }) => {
  return (
    <button
      id={id}
      className={activeButton === id ? "text-button selected" : "text-button"}
      onClick={() => handleClick(id)}
    >
      <p>{`${value}x${value}`}</p>
    </button>
  );
};

export default Button;
