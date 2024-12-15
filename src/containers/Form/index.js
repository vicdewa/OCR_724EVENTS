import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
// Ajout d'un état pour que le formulaire soit remplacé par un message de confirmation une fois le message correctement envoyé //
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // Reset success message before trying to send the form
      setSuccessMessage(""); 
      // We try to call mockContactApi
      try {
        await mockContactApi();
        console.log('API OK');
        setSending(false);
        setSuccessMessage("Message envoyé !");
        console.log('Message envoyé')
        setFormSubmitted(true);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <div>
    {!formSubmitted ? (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
      </form>
    ):(
      <div className="succes-message">
      {successMessage}
    </div>
  )}
  </div>
  );
    };

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
