import React from 'react';
import {Button, Card, Container, FormControl, InputGroup, Table} from 'react-bootstrap';
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
        const nodeUrl = 'http://api-01.eu-central-1.symboldev.network:3000';
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
                                    Address
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder='Input your Address'
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

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Mosaic id</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.mosaics.map((mosaic, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{mosaic.id.toHex() || 'None'}</td>
                                    <td>{mosaic.amount.lower || 0}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

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