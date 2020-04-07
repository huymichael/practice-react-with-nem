import React from 'react';
import {Button, Card, Container, FormControl, InputGroup} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';


class CreateAccountByKey extends React.Component {
    constructor() {
        super();
        this.state = {
            access: '',
            publicKey:'',
            privateKey: '',
        };
    }

    onCreateAccountByKey = () => {
        const privateKey = '0000000000000000000000000000000000000000000000000000000000000000';
        const account = SymbolSDK.Account.createFromPrivateKey(privateKey, SymbolSDK.NetworkType.TEST_NET);
        account.
        this.setState({
            access: account.address.pretty(),
            publicKey: account.publicKey,
            privateKey: account.privateKey,
        });
    };

    render() {
        return (
            <Card>
                <Container>
                    <Card.Title className='mt-2'>
                        Create Account By Private Key
                    </Card.Title>
                    <Card.Subtitle>
                        Private Key : 0000000000000000000000000000000000000000000000000000000000000000
                    </Card.Subtitle>
                    <Card.Body>
                        <Button className='mb-2' onClick={this.onCreateAccountByKey}>Create Account</Button>
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

export default CreateAccountByKey;