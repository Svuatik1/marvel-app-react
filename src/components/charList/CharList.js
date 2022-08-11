import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChars: {},
    };
  }

  componentDidMount() {
    this.updateChars();
  }

  marvelService = new MarvelService();

  onCharLoaded = (chars) => {
    this.setState({ allChars: chars });
  };

  updateChars = () => {
    this.marvelService.getAllCharacters().then(this.onCharLoaded);
  };

  render() {
    const { allChars } = this.state;
    let elements;
    if (Object.keys(allChars).length !== 0) {
      elements = allChars.map((item) => {
        return (
          <li key={item.name} className="char__item">
            <img src={item.thumbnail} alt={item.name} />
            <div className="char__name">{item.name}</div>
          </li>
        );
      });
    }

    return (
      <div className="char__list">
        <ul className="char__grid">{elements}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
