const Arrow = ({ direction, clickFunction, glyph }) => {
  return (
    <button
      className={`slide-arrow ${direction}`}
      onClick={clickFunction}>
        next value
    </button>)
}
export default Arrow;
