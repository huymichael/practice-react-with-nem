import React from 'react';
import {Button, Card, Container, FormControl, InputGroup} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';


class CreateAccountByKey extends React.Component {
    constructor() {
        super();
        this.state = {
            access: '',
            publicKey: '',
            privateKey: '',
        };
    }

    onCreateAccountByKey = () => {
        const account = SymbolSDK.Account.createFromPrivateKey(
            this.state.privateKey,
            SymbolSDK.NetworkType.TEST_NET);

        this.setState({
            access: account.address.pretty(),
            publicKey: account.publicKey,
            privateKey: account.privateKey,
        });
    };
    onInput = (event) => {
        this.setState({
            privateKey: event.target.value,
        });
    };

    render() {
        return (
            <Card>
                <Container>
                    <Card.Title className='mt-2'>
                        Create Account By Private Key
                    </Card.Title>
                    <Card.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Private Key
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={this.onInput} placeholder='Input Private Key'/>
                        </InputGroup>


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
                    </Card.Body>
                </Container>
            </Card>
        );
    }

}

export default CreateAccountByKey;