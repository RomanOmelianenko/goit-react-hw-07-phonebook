import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Header from './Header/Header';
import Logo from './Logo/Logo';
import ShowModalWarning from './ShowModal/ShowModalWarning';
import Loader from './helpers/Loader';
import contactsOperations from '../redux/contacts/contactsOperations';
import contactsSelectors from '../redux/contacts/contactsSelectors';
import './App.css';

class App extends Component {

    static propTypes = {
        modalWarning: PropTypes.bool.isRequired,
        contactsItems: PropTypes.array.isRequired,
    };

    componentDidMount() {
        this.props.onFetchContacts();
    };

    render() {
        return (
            <div className="Wrapper">

                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames="HeaderAppear"
                    unmountOnExit
                >
                {stage => {
                    // console.log(stage);
                    return (
                        <div className="Header">
                            <Header />
                            <CSSTransition
                                in={stage === 'entered'}
                                timeout={500}
                                classNames="LogoAppear"
                                unmountOnExit
                            >
                                <Logo />
                            </CSSTransition>
                        </div>
                    )
                }}
                </CSSTransition>
            
                    <ContactForm/>

                <CSSTransition
                    in={this.props.contactsItems.length > 1}
                    timeout={250}
                    classNames="FilterAppear"
                    unmountOnExit
                >
                    <Filter/>
                </CSSTransition>

                {this.props.isLoadingContacts && <Loader />}
                
                <CSSTransition
                    in={this.props.contactsItems.length > 0}
                    timeout={250}
                    classNames="ContactsAppear"
                    unmountOnExit
                >
                    <h2 className="ContactsName">
                        Contacts
                    </h2>
                </CSSTransition>
                
                <CSSTransition
                    in={this.props.contactsItems.length > 0}
                    timeout={250}
                    classNames="ContactListApp"
                    unmountOnExit
                >
                    <ContactList/>
                </CSSTransition>

                <CSSTransition
                    in={this.props.modalWarning}
                    timeout={250}
                    classNames="ShowModalAppear"
                    unmountOnExit
                >
                    <ShowModalWarning />
                </CSSTransition>
               
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        modalWarning: contactsSelectors.getModalwarning(state),
        contactsItems: contactsSelectors.getContactsItems(state),
        isLoadingContacts: contactsSelectors.getLoading(state)
    };
};

const mapDispatchToProps = {
    onFetchContacts: contactsOperations.fetchContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(App);