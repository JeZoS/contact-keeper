import React, {
  useContext,
  useEffect,
  useRef,
} from "react";
import ContactContext from "../../contexts/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const {
    filtered,
    clearFilter,
    filterContacts,
  } = contactContext;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, []);

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter"
        onChange={onChange}
      ></input>
    </form>
  );
};

export default ContactFilter;
