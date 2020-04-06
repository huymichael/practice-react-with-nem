import React from 'react';
import Button from 'reactstrap/es/Button';
import symbol_sdk_1 from 'symbol-sdk';

const App = () => {
    return (
        <div>
            <h1>NEM PRACTICE</h1>
            <div>
                <Button
                    onClick={() => {
                        const account = symbol_sdk_1.Account
                            .generateNewAccount(symbol_sdk_1.NetworkType.TEST_NET);
                        console.log('Your new account address is:', account.address.pretty(),
                            'and its private key', account.privateKey);
                    }}>
                    Create account
                </Button>
            </div>
        </div>
    );
};

export default App;
