import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, List } from "@mui/material";
import { ContactCard } from "./ContactCard";
import { ContactForm } from "./ContactForm";
import { Placeholder } from "./Placeholder";
import {
  addContactThunk,
  getContactsThunk,
  selectContacts,
} from "../../store/ContaсtsSlice";
import { Contact } from "../../types/types";
import "./styles.css";

export const ContactList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    dispatch(getContactsThunk());
    setIsLoading(false);
  };

  const renderContacts = (data: Contact[]) => {
    if (data.length === 0) return <Placeholder />;

    return data.map((contact) => (
      <ContactCard
        name={contact.name}
        email={contact.email}
        id={contact.id}
        key={contact.email}
      />
    ));
  };

  const addContact = (contact: Omit<Contact, "id">) => {
    dispatch(addContactThunk(contact));
  };

  return (
    <div className={"contactList-wrapper"}>
      <List className="contactList">
        {isLoading ? <CircularProgress /> : renderContacts(contacts)}
      </List>
      {isAddFormOpen ? (
        <div className="contactList-addContactForm">
          <ContactForm onSubmit={addContact} setFormOpen={setAddFormOpen} />
        </div>
      ) : (
        <Button
          variant="outlined"
          onClick={() => setAddFormOpen(true)}
          sx={{ maxWidth: "150px", marginBottom: "10px" }}
        >
          Add contact
        </Button>
      )}
    </div>
  );
};
