import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import {
  deleteContactThunk,
  editContactThunk,
} from "../../store/ContaсtsSlice";
import { ContactForm } from "./ContactForm";
import { Contact } from "../../types/types";

export const ContactCard = ({ name, email, id }: Contact): JSX.Element => {
  const [isEditMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const submitEdit = ({ email, name }: Omit<Contact, "id">) => {
    dispatch(editContactThunk({ email, name, id }));
  };

  const deleteContact = (id: number) => {
    dispatch(deleteContactThunk(id));
  };

  return (
    <div className="contactsList-card">
      <ListItem alignItems="flex-start">
        {isEditMode ? (
          <ContactForm
            setFormOpen={setEditMode}
            onSubmit={submitEdit}
            contact={{ name, email, id }}
          />
        ) : (
          <>
            <ListItemAvatar>
              <Avatar alt={name}>{name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={email} />
            <div className="contactsList-card-actions">
              <IconButton onClick={() => setEditMode(true)}>
                <EditOutlined color="primary" />
              </IconButton>
              <IconButton onClick={() => deleteContact(id)}>
                <DeleteOutlined color="primary" />
              </IconButton>
            </div>
          </>
        )}
      </ListItem>
    </div>
  );
};
