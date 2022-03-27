import { axiosClient } from "./axios";
import { Contact } from "../types/types";

export const getContacts = async (): Promise<Contact[] | void> => {
  try {
    const response = await axiosClient.get("/contacts");

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addContact = async (
  contact: Omit<Contact, "id">
): Promise<Contact | void> => {
  try {
    const response = await axiosClient.post("/contacts", contact);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const editContact = async (
  contact: Contact
): Promise<Contact | void> => {
  try {
    const response = await axiosClient.put("/contacts/" + contact.id, contact);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteContact = async (id: number): Promise<string | void> => {
  try {
    const response = await axiosClient.delete("/contacts/" + id);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
