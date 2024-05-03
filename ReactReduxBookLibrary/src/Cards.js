import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCards } from "./service/api";
import { Spinner } from "./Spinner";

function Cards() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [endCart, setEndCart] = useState({
    active: false,
    params: ["the end", "the end"],
  });
  const [isLoading, setIsloading] = useState(true);
  const [pairsList, setPairsList] = useState([]);
  const [someIndex, setSomeIndex] = useState(0);
  const [activeClass, setActiveClass] = useState("");
  function handleReturn() {
    navigate("..", { relative: "path" });
  }
  function flippedCard() {
    setActiveClass("card__item_flipped");
    setTimeout(() => {
      setActiveClass("");
    }, 1500);
    setTimeout(() => {
      if (someIndex < pairsList.length - 1) {
        setSomeIndex(someIndex + 1);
      } else {
        setEndCart({ ...endCart, active: true });
        setTimeout(() => {
          navigate("..", { relative: "path" });
        }, 400);
      }
    }, 1600);
  }
  useEffect(() => {
    async function getData() {
      const { pairs } = await fetchCards(cardId);
      setPairsList(pairs);
      setIsloading(false);
    }
    getData();
  }, []);
  return (
    <section className="card section-offset">
      <div className="container card__container">
        <button
          className="card__return"
          aria-label="Возврат к категориям"
          onClick={handleReturn}
        ></button>

        {isLoading ? (
          <Spinner />
        ) : (
          <button
            className={`card__item ${activeClass}`}
            onClick={flippedCard}
            disabled={activeClass}
          >
            <span className="card__front">
              {endCart.active ? endCart.params[0] : pairsList[someIndex][0]}
            </span>
            <span className="card__back">
              {endCart.active ? endCart.params[1] : pairsList[someIndex][1]}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
export { Cards };
