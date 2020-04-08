import React from 'react';
import {Button, Card, Container, FormControl, InputGroup} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';

class GetAccountInfo extends React.Component {

    constructor() {
        super();
        this.state = {
            address: '',
            publicKey: '',
            mosaics: [],
            totalAmount: '',
            error: ''
        };
    }

    onValueChange = (event) => {
        this.setState({
                address: event.target.value,
            }
        );
    };
    onGetAccountInfo = () => {
        // replace with recipient address
        const address = SymbolSDK.Address.createFromRawAddress(this.state.address.trim());
        // replace with node endpoint
        const nodeUrl = 'http://api-01.us-west-1.symboldev.network:3000';
        const repositoryFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
        const accountHttp = repositoryFactory.createAccountRepository();

        accountHttp
            .getAccountInfo(address)
            .subscribe(
                (accountInfo) => {
                    let totalAmount = 0;
                    accountInfo.mosaics.forEach((item) => {
                        totalAmount += item.amount.lower;
                    });
                    // console.log(totalAmount);
                    // console.log(totalAmount);
                    this.setState({
                        publicKey: accountInfo.publicKey,
                        mosaics: accountInfo.mosaics,
                        totalAmount: totalAmount,
                        error: ''
                    });
                },
                (err) => {
                    this.setState({
                        error: err
                    });
                });
    };

    render() {
        return (
            <Card>
                <Container>
                    <Card.Title className='mt-2'>
                        Get Account Info
                    </Card.Title>
                    <Card.Body>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Access
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder='Input your Access Address'
                                         onChange={this.onValueChange}/>
                        </InputGroup>

                        <Button className='mb-3'
                                onClick={this.onGetAccountInfo}>Get Account Info</Button>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Public Key
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl disabled value={this.state.publicKey}/>
                        </InputGroup>

                        <div>
                            {this.state.mosaics.forEach(item=>(
                                <p>
                                    {item.amount.lower}
                                </p>
                            ))}
                        </div>

                        <br/>
                        <Card.Footer>
                            <h4>error</h4>
                            <p>{this.state.error.toString()}</p>
                        </Card.Footer>
                    </Card.Body>
                </Container>
            </Card>
        );
    }
}

export default GetAccountInfo;