import "./charList.scss";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {
  const [allChars, setAllChar] = useState([]);
  const [count, setCount] = useState(10);
  const [newLoading, setNewLoading] = useState(true);

  const { loading, getAllCharacters } = useMarvelService();

  useEffect(() => {
    updateChars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCharLoaded = (chars) => {
    setAllChar(chars);
  };

  const updateChars = () => {
    getAllCharacters().then(onCharLoaded);
  };

  const onNewCharLoaded = (newItem) => {
    setAllChar([...allChars, ...newItem]);
    setNewLoading(true);
  };

  const onLoadMore = () => {
    setCount((count) => count + 10);
    setNewLoading((newLoading) => false);
    getAllCharacters(count).then(onNewCharLoaded);
  };

  const { onCharSelected } = props;

  let elements;
  if (Object.keys(allChars).length !== 0) {
    elements = allChars.map((item, i) => {
      let clazz = "char__item";
      if (i === 3) {
        clazz = "char__item";
      }
      return (
        <li
          key={item.id}
          className={clazz}
          onClick={() => onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
  }

  return (
    <div className="char__list">
      {!loading ? null : <Spinner />}
      <ul className="char__grid">{elements}</ul>
      {newLoading ? null : <Spinner />}
      <button className="button button__main button__long">
        <div className="inner" onClick={onLoadMore}>
          load more
        </div>
      </button>
    </div>
  );
};

export default CharList;
