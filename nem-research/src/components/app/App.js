import React from 'react';
import {Container} from 'react-bootstrap';
import './App.scss';
import CreateAccount from '../create-account/create-account';
import CreateAccountByKey from '../create-account-by-key/create-account-by-key';
import CreateMosaic from '../create-mosaic/create-mosaic';
import GetAccountInfo from '../get-account-info/get-account-info';
import SendingMosaic from '../sending-mosaic/sending-mosaic';
import AddMetadataToAccount from '../add-metadata-to-account/add-metadata-to-account';

const App = () => {
    return (
        <Container className='app mt-5'>
            <h1>Create Account</h1>
            <br/>
            <CreateAccount/>
            <br/>
            <CreateAccountByKey/>
            <br/>

            <h1>Create Mosaic</h1>
            <br/>
            <CreateMosaic/>
            <br/>

            <h1>Get Account Info</h1>
            <br/>
            <GetAccountInfo/>
            <br/>

            <h1>Send Mosaic To Other Account</h1>
            <br/>
            <SendingMosaic/>
            <br/>

            <h1>Add Metadata to Account</h1>
            <br/>
            <AddMetadataToAccount/>
        </Container>
    );
};

export default App;
