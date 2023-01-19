const LoadMore = ({ onClick, children }) =>
  <button onClick={onClick} type="button" className="Button">{children}</button>;

export default LoadMore;