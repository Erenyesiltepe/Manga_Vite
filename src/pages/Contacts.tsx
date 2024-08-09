import React from 'react';
import MailForm from '../components/MailForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contacts: React.FC= () => {
    // Implement your component logic here

    return (
        // JSX code for your component's UI goes here
        <div>
            <Header/>
            <MailForm/>
            <Footer/>
        </div>
    );
};

export default Contacts;