import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      // On cherchele bouton avec le texte "Envoyer"
      const submitButton = await screen.findByText("Envoyer");
      // On simule un clic sur le bouton
      fireEvent.click(submitButton);
      // On vérifie que le texte "En cours" apparaît après le clic
      await screen.findByText("En cours");
      // On vérifie que "Message envoyé !" est bien affiché après l'envoi
      await screen.findByText("Message envoyé !");
      // On vérifie que onSuccess a bien été appelée
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
