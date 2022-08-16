import "./appHeader.scss";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        {/* eslint-disable-next-line */}
        <a href="#">
          <span>Marvel</span> information portal
        </a>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            {/* eslint-disable-next-line */}
            <a href="#">Characters</a>
          </li>
          /
          <li>
            {/* eslint-disable-next-line */}
            <a href="#">Comics</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
