import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //La fonction pose problème car elle montre les mêmes résultats, que le type soit défini ou pas. Ici on compare le filtre sélectionné avec le type des événements et ne montre que ceux qui ont le même type que le filtre. Si on n'a aucun filtre sélectionné, on affiche tous les événements.


  //Filtrage des événements en fonction de la catégorie (=type) sélectionnée 
  const filteredEvents = type
    ? data?.events.filter((event) => event.type === type)
    : data?.events || [];

  // Calcul du nombre total de pages APRÈS filtrage
  const pageNumber = Math.floor(filteredEvents.length / PER_PAGE) + (filteredEvents.length % PER_PAGE > 0 ? 1 : 0);

  //Affichage des événements de la page actuelle
  const eventsForCurrentPage = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE, //Début de la "tranche"
    currentPage * PER_PAGE // Fin de la "tranche"
  );

  // Retour à la première page lorsque la catégorie (=type) change
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
    console.log(evtType);
  };

  // Liste des types d'événements du menu déroulant
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {eventsForCurrentPage.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
