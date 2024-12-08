import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import ServiceCard from "../../components/ServiceCard";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // On "render" la page entière, qui contient ServiceCard
    render(<Home />); 
    // On vérifie que chaque ServiceCard contient le titre attendu
    expect(screen.getByText("Soirée d’entreprise")).toBeInTheDocument();
    expect(screen.getByText("Conférences")).toBeInTheDocument();
    expect(screen.getByText("Experience digitale")).toBeInTheDocument();
  });
  it("a list a people is displayed", () => {
    // On "render" la page entière, qui contient PeopleCard
    render(<Home />); 
    // On vérifie que chaque People contient la "position" 
    expect(screen.getByText("CEO")).toBeInTheDocument();
    expect(screen.getByText("Directeur marketing")).toBeInTheDocument();
    expect(screen.getByText("CXO")).toBeInTheDocument();
    expect(screen.getByText("Animateur")).toBeInTheDocument();
    expect(screen.getByText("VP animation")).toBeInTheDocument();
    expect(screen.getByText("VP communication")).toBeInTheDocument();
  })
  it("a footer is displayed", () => {
    // On "render" la page entière
    render (<Home />);
    // On vérifie que le footer est présent dans le code HTML
    const footerElement = screen.getByRole("contentinfo"); 
    // On vérifie que le footer est dans le document
    expect(footerElement).toBeInTheDocument();
    // On vérifie la présence de certains éléments du footer
    expect(screen.getByText("Notre dernière prestation")).toBeInTheDocument();
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();     
  })
});