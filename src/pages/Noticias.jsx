import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import Header from "../components/Header";
import useInterOb from "../hook/useInterOb";
import { fetchApiNoticias } from '../helpers/fetchApiNoticias';
import { useDispatch, useSelector } from "react-redux";
import { addNoticiaFavorita } from "../store/noticias/noticiasSlice";
import { localStorageGet } from "../helpers/localStorageGet";
import './Noticias.css';




function App() {
  const [noticiasState, setNoticiasState] = useState(null);
  const [search, setSearch] = useState("");
  const [params, setParams] = useState({ tematica: "JavaScript", cantidad: 5 });
  const dispatch = useDispatch();
  const noticiasStorage = localStorageGet("noticiasFavoritas");

  useEffect(() => {
    if (noticiasStorage.length > 0) {
      noticiasStorage.forEach(noticia => {
        dispatch(addNoticiaFavorita(noticia));
      });
    }
  }, [dispatch]);

  const [setElements, isIntersecting] = useInterOb({
    threshold: 0.25,
    root: null,
  });

  useEffect(() => {
    setElements([document.querySelector("#final")]);
  }, [setElements]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticia = await fetchApiNoticias(params.tematica, params.cantidad, 1);
        if (noticia) {
          setNoticiasState(noticia);
          console.log(noticia);
        }
      } catch (error) {
        console.error("Error fetching noticias:", error);
      }
    };

    fetchData();
    document.querySelector("#final").classList.remove("isStart");
  }, [params]);

  useEffect(() => {
    setParams(prevParams => ({ ...prevParams, cantidad: prevParams.cantidad + 1 }));
  }, [isIntersecting]);

  return (
    <>
      <Header />
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar temática..."
      />

      <div className="contenedor">
        {noticiasState ? (
          noticiasState.map((noticia) => (
            noticia.title && (
              <NewsCard
                key={noticia.url}
                titulo={noticia.title}
                autor={noticia.author}
                imagen={noticia.urlToImage}
                url={noticia.url}
                descripcion={noticia.description}
                fecha={noticia.publishedAt}
                isFavorite={noticiasStorage ? noticiasStorage.some((noticiaStorage) => noticiaStorage.url === noticia.url) : false}
              />
            )
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>

      <div className="isStart" id="final"></div>
    </>
  );
}

export default App;
