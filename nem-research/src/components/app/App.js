import React from 'react';
import {Container} from 'react-bootstrap';
import './App.scss';
import CreateAccount from '../create-account/create-account';
import CreateAccountByKey from '../create-account-by-key/create-account-by-key';
import CreateMosaic from '../create-mosaic/create-mosaic';
import GetAccountInfo from '../get-account-info/get-account-info';
import SendingMosaic from '../sending-mosaic/sending-mosaic';

const App = () => {
    return (
        <Container className='app mt-5'>
            <CreateAccount/>
            <br/>
            <CreateAccountByKey/>
            <br/>
            <GetAccountInfo/>
            <br/>
            <CreateMosaic/>
            <br/>
            <SendingMosaic/>
        </Container>
    );
};

export default App;
