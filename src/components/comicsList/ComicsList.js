import "./comicsList.scss";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newLoading, setNewLoading] = useState(true);
  const [count, setCount] = useState(8);
  const { loading, getAllComics } = useMarvelService();

  useEffect(() => {
    return getComicsInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComicsInfo = () => {
    getAllComics().then((res) => {
      setComicsList(_transformData(res));
    });
  };

  const onNewCharLoaded = (newItem) => {
    setComicsList([...comicsList, ..._transformData(newItem)]);
    setNewLoading(true);
  };

  const onLoadMore = () => {
    setCount((count) => count + 10);
    setNewLoading((newLoading) => false);
    getAllComics(count).then(onNewCharLoaded);
  };

  const _transformData = (data) => {
    return data.results.map((item) => {
      return {
        id: item.id,
        title: item.title,
        imgUrl: `${item.thumbnail.path}.jpg`,
        price: item.prices[0].price
          ? `${item.prices[0].price}$`
          : "Prise is not defined",
        key: item.id,
      };
    });
  };

  const elements = comicsList.map((item, i) => {
    return (
      <li key={i} className="comics__item">
        {/* eslint-disable-next-line */}
        <Link to={`/comics/${item.id}`}>
          <img
            src={item.imgUrl}
            alt={item.title}
            className="comics__item-img"
          />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">{item.price}</div>
        </Link>
      </li>
    );
  });

  return (
    <div className="comics__list">
      {!loading ? null : <Spinner />}
      <ul className="comics__grid">{elements}</ul>
      {newLoading ? null : <Spinner />}
      <button className="button button__main button__long">
        <div className="inner" onClick={onLoadMore}>
          load more
        </div>
      </button>
    </div>
  );
};

export default ComicsList;
