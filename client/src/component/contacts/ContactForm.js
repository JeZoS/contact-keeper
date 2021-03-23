import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import ContactContext from "../../contexts/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const {
    addContact,
    current,
    clearCurrent,
    updateContact,
  } = contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    type: "personal",
    phone: "",
  });

  useEffect(() => {
    if (current != null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        type: "personal",
        phone: "",
      });
    }
  }, [contactContext, current]);

  const { name, email, type, phone } = contact;

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      name: "",
      email: "",
      type: "personal",
      phone: "",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        // defaultChecked={type === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        // defaultChecked={type === "professional"}
        onChange={onChange}
      />
      Professional{" "}
      <div>
        <input
          type="submit"
          value={current ? "Update contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div
          className="btn btn-light btn-block"
          onClick={clearAll}
        >
          Clear
        </div>
      )}
    </form>
  );
};

export default ContactForm;
