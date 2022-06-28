const Tile = ({ char, className }) => {
  char = char.toUpperCase();
  return <div className={className}>{char}</div>;
};

export default Tile;
