import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); 
  console.log(data)
  const [index, setIndex] = useState(0);
// MODIF > Si A est plus récent que B, alors A est placé avant B. Si A est moins récent que B alors A est placé après B. //  
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  console.log(byDateDesc);
  const nextCard = () => {
    setIndex((prevIndex) => {
// MODIF > Si l'index est supérieur ou égal à la longueur du tableau - 1, réinitialiser la boucle à 0 + ajout d'un intervalle //
      return prevIndex >= byDateDesc.length - 1 ? 0 : prevIndex + 1;
    }, [index, byDateDesc.length]);
  };

  useEffect(() => {
    const intervalId = setInterval(nextCard, 5000);
    return () => clearInterval(intervalId);
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
            
  
    <div className="SlideCard__paginationContainer">
      <div className="SlideCard__pagination">
          {byDateDesc?.map((eventPagination, radioIdx) => (
            <input
                  id={eventPagination.title}
                  key={eventPagination.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
    </div>     
  );
};

export default Slider;
