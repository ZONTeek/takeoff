import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  editContact,
  getContacts,
} from "../api/contactsService";
import { Contact, RootStateType } from "../types/types";

export const getContactsThunk = createAsyncThunk("/contacts", async () => {
  const data = await getContacts();
  console.log(data);

  return data;
});

export const editContactThunk = createAsyncThunk<Contact, Contact>(
  "/contacts/update",
  async (contact) => {
    const data = await editContact(contact);
    console.log(data);

    return data as Contact;
  }
);

export const addContactThunk = createAsyncThunk<Contact, Omit<Contact, "id">>(
  "/contacts/add",
  async (contact) => {
    const data = await addContact(contact);
    console.log(data);

    return data as Contact;
  }
);

export const deleteContactThunk = createAsyncThunk<number, number>(
  "/contacts/delete",
  async (id) => {
    await deleteContact(id);

    return id;
  }
);

const initialState = {
  contacts: [] as Contact[],
  searchFilter: "",
};

const ContactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContactsThunk.fulfilled, (state, action) => {
      state.contacts = action.payload as Contact[];
    });
    builder.addCase(editContactThunk.fulfilled, (state, action) => {
      state.contacts = state.contacts.map((contact: Contact) => {
        if (contact.id === action.payload.id) contact = action.payload;
        return contact;
      });
    });
    builder.addCase(deleteContactThunk.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    });
    builder.addCase(addContactThunk.fulfilled, (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    });
  },
});

export const { setSearchFilter } = ContactsSlice.actions;

export const selectContacts = (state: RootStateType): Contact[] => {
  if (state.contacts.searchFilter) {
    return state.contacts.contacts.filter((contact) => {
      const filter = state.contacts.searchFilter.toLocaleLowerCase();
      const nameToCompare = contact.name.toLocaleLowerCase();
      const emailToCompare = contact.email.toLocaleLowerCase();

      if (nameToCompare.includes(filter) || emailToCompare.includes(filter))
        return contact;
      return false;
    });
  }
  return state.contacts.contacts;
};

export const selectSearchFilter = (state: RootStateType): string =>
  state.contacts.searchFilter;

export const ContactsReducer = ContactsSlice.reducer;
