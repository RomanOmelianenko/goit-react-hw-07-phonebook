import React from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ContactList.css';
import contactsOperations from '../../redux/contacts/contactsOperations';
import contactsSelectors from '../../redux/contacts/contactsSelectors';

const ContactList = ({ contacts, onRemoveContact }) => (
    <TransitionGroup
        component="ul"
        className="TaskList">
            
        {contacts.map(({id, text}) => (
            <CSSTransition
                key={id}
                timeout={250}
                classNames="ContactListAppear"
                // unmountOnExit
            >
                <li
                    className="TaskList_item"
                    /*key={contact.id}*/>
                    {text.name}: {text.number}
                    {
                        <button
                            className="TaskList_button"
                            type="button"
                            name="delete"
                            onClick={() => onRemoveContact(id)}
                        >
                            x
                        </button>
                    }
                </li>
            </CSSTransition>
        ))}
    </TransitionGroup>
);
    

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            number: PropTypes.string,
        })),
};

const mapStateToProps = state => ({
    contacts: contactsSelectors.getVisibleContacts(state)
});

const mapDispatchToProps = {
    onRemoveContact: contactsOperations.removeContact
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);