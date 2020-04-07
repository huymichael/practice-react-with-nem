import React from 'react';
import {Container} from 'react-bootstrap';
import './App.scss';
import CreateAccount from '../create-account/create-account';
import CreateAccountByKey from '../create-account-by-key/create-account-by-key';
import CreateMosaic from '../create-mosaic/create-mosaic';

const App = () => {
    return (
        <Container className='app mt-5'>
            <CreateAccount/>
            <br/>
            <CreateAccountByKey/>
            <br/>
            <CreateMosaic/>
        </Container>
    );
};

// const App = () => {
//     return (
//         <div>
//             <h1>NEM PRACTICE</h1>
//             <div>
//                 <Button
//                     onClick={() => {
//                         const account = SymbolSDK.Account
//                             .generateNewAccount(SymbolSDK.NetworkType.TEST_NET);
//                         console.log('Your new account address is:', account.address.pretty(),
//                             'and its private key', account.privateKey);
//                     }}>
//                     Create account
//                 </Button>
//             </div>
//         </div>
//     );
// };

export default App;
