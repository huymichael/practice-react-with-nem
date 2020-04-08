import React from 'react';
import {Button, Card, Container, FormControl, InputGroup} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';

class CreateAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            access: '',
            publicKey: '',
            privateKey: '',
        };
    }

    onCreateAccount = () => {
        // const password = new SymbolSDK.Password('password');
        //
        // const wallet = SymbolSDK.SimpleWallet.create('michael1', password, SymbolSDK.NetworkType.TEST_NET);
        // const account = wallet.open(password);
        // console.log('Your new account address is:', account.address.pretty(), 'and its private key', account.privateKey);
        const account = SymbolSDK.Account.generateNewAccount(SymbolSDK.NetworkType.TEST_NET);
        this.setState({
            access: account.address.pretty(),
            publicKey: account.publicKey,
            privateKey: account.privateKey
        });
    };

    render() {
        return (
            <Card>
                <Container>
                    <Card.Title className='mt-2'>
                        Create Account
                    </Card.Title>
                    <Card.Body>
                        <Button className='mb-2' onClick={this.onCreateAccount}>Create Account</Button>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Access
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl disabled value={this.state.access}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Public Key
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl disabled value={this.state.publicKey}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Private Key
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl disabled value={this.state.privateKey}/>
                        </InputGroup>
                    </Card.Body>
                </Container>
            </Card>
        );
    }
}

export default CreateAccount;