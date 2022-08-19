import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=9c3c837b96a89e1d91f8930d380b1498";

  const getAllCharacters = async (count) => {
    let lastCount;
    if (count) {
      lastCount = 291 + count;
    } else lastCount = 291;

    const res = await request(
      `${_apiBase}characters?limit=9&offset=${lastCount}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (count) => {
    let lastCount;
    if (count) {
      lastCount = 220 + count;
    } else lastCount = 220;
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${lastCount}&${_apiKey}`
    );
    return res.data;
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of page",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects.language || "en-us",
      price: comics.prices.price ? `${comics.prices.price}$` : "not availabel",
    };
  };

  const _transformCharacter = (char) => {
    let descr;
    if (char.description) {
      if (char.description.length > 200) {
        descr = `${char.description.slice(0, 200)}...`;
      } else if (char.description.length < 400) {
        descr = char.description;
      }
    } else descr = "There is no description about this character";

    return {
      id: char.id,
      name: char.name,
      description: descr,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComics,
  };
};

export default useMarvelService;
