import axios from 'axios';
import contactsActions from './contactsActions';

axios.defaults.baseURL = 'http://localhost:2000';

const addContact = text => dispatch => {

    dispatch(contactsActions.addContactRequest());

    axios
        .post('/contacts', { text })
        .then(response => dispatch(contactsActions.addContactSuccess(response.data)))
        .catch(error => dispatch(contactsActions.addContactError(error)))
};

const fetchContacts = () => dispatch => {
    dispatch(contactsActions.fetchContactsRequest());

    axios
        .get('/contacts')
        .then(response => dispatch(contactsActions.fetchContactsSuccess(response.data)))
        .catch(error => dispatch(contactsActions.fetchContactsError(error)))
};

const removeContact = id => dispatch => {
    dispatch(contactsActions.removeContactRequest());

    axios
        .delete(`/contacts/${id}`)
        .then(() => dispatch(contactsActions.removeContactSuccess(id)))
        .catch(error => dispatch(contactsActions.removeContactError(error)))
};

const operations = {
    addContact,
    fetchContacts,
    removeContact
};

export default operations;