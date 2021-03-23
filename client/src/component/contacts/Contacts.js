import React, {
  Fragment,
  useContext,
  useEffect,
} from "react";
import ContactContext from "../../contexts/contact/contactContext";
import Spinner from "../layout/Spinner";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const {
    contacts,
    filtered,
    getContact,
    loading,
  } = contactContext;

  useEffect(() => {
    getContact();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <Fragment>
          {filtered !== null
            ? filtered.map((contact) => (
                <ContactItem contact={contact} />
              ))
            : contacts.map((contact) => (
                <ContactItem contact={contact} />
              ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
