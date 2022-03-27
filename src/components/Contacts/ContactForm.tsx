import { Formik } from "formik";
import { IconButton, TextField } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { Contact } from "../../types/types";

export const ContactForm = ({
  onSubmit,
  setFormOpen,
  contact,
}: ContactFormPropsType): JSX.Element => {
  return (
    <Formik
      initialValues={{
        name: contact?.name ?? "",
        email: contact?.email ?? "",
      }}
      onSubmit={(values) => {
        onSubmit(values);
        setFormOpen(false);
      }}
    >
      {(props: any) => (
        <form onSubmit={props.handleSubmit} className="contactsList-card-edit">
          <TextField
            label="Name"
            name="name"
            size="small"
            onChange={props.handleChange}
            value={props.values.name}
            sx={{ maxWidth: "180px", marginRight: "10px" }}
          />
          <TextField
            label="Email"
            name="email"
            size="small"
            onChange={props.handleChange}
            value={props.values.email}
            sx={{
              maxWidth: "190px",
              marginRight: "10px",
            }}
          />
          <div className="contactsList-card-actions">
            <IconButton onClick={() => setFormOpen(false)}>
              <Close color="primary" />
            </IconButton>
            <IconButton type="submit">
              <Check color="primary" />
            </IconButton>
          </div>
        </form>
      )}
    </Formik>
  );
};

type ContactFormPropsType = {
  onSubmit: (values: Omit<Contact, "id">) => void;
  setFormOpen: (arg: boolean) => void;
  contact?: Contact;
};
