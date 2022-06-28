const Box = ({ char, className }) => {
  char = char.toUpperCase();
  return <div className={className}>{char}</div>;
};

export default Box;
