import React from 'react';
import {Button, Card, Container, FormControl, InputGroup} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';

class GetAccountInfo extends React.Component {

    constructor() {
        super();
        this.state = {
            address: '',
            publicKey: '',
            mosaicID: '',
            mosaicAmount: '',
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
        // const rawAddress = 'TBBODM-QQFQWO-EGER7B-GEKDH3-LWOKVY-O44NQQ-UWT3';
        const address = SymbolSDK.Address.createFromRawAddress(this.state.address);
        // const address = SymbolSDK.Address.createFromRawAddress(this.state.address.trim());
        // replace with node endpoint
        const nodeUrl = 'http://api-01.us-west-1.symboldev.network:3000';
        const repositoryFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
        const accountHttp = repositoryFactory.createAccountRepository();

        accountHttp
            .getAccountInfo(address)
            .subscribe(
                (accountInfo) => {
                    this.setState({
                        publicKey: accountInfo.publicKey,
                        mosaicID: accountInfo.mosaics[0].id['id'].lower,
                        mosaicAmount: accountInfo.mosaics[0].amount.lower,
                    });
                    console.log(accountInfo);
                },
                (err) => console.error(err));
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

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Mosaic ID
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl disabled value={this.state.mosaicID.toString()}/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Mosaic Amount
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl disabled value={this.state.mosaicAmount}/>
                        </InputGroup>
                    </Card.Body>
                </Container>
            </Card>
        );
    }
}

export default GetAccountInfo;