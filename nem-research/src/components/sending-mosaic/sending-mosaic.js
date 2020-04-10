import React from 'react';
import {Button, Card, Col, Container, FormControl, InputGroup, Row} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';

class SendingMosaic extends React.Component {
    constructor() {
        super();
        this.state = {
            mosaicId: '',
            mosaicUnit: '',
            recipientAddress: '',
            messages: ''
        };
    }

    onInputAddressChange = (value) => {
    };
    onSendMosaic = () => {
        // Defining a transaction
        // replace with recipient address
        const rawAddress = 'TA6FD7-5PKQVF-EMHGDK-QKC4VF-4QIFC6-UWOWUZ-2USD';
        const recipientAddress = SymbolSDK.Address.createFromRawAddress(rawAddress);
// replace with network type
        const networkType = SymbolSDK.NetworkType.TEST_NET;
// replace with symbol.xym id
        const networkCurrencyMosaicId = new SymbolSDK.MosaicId('747B276C30626442');
        // replace with network currency divisibility
        const networkCurrencyDivisibility = 6;

        const transferTransaction = SymbolSDK.TransferTransaction.create(
            SymbolSDK.Deadline.create(),
            recipientAddress,
            [new SymbolSDK.Mosaic(networkCurrencyMosaicId,
                SymbolSDK.UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility)))],
            SymbolSDK.PlainMessage.create('This is a test message'),
            networkType,
            SymbolSDK.UInt64.fromUint(168));
        console.log(transferTransaction.serialize());
        // replace with sender private key
        const privateKey = '1111111111111111111111111111111111111111111111111111111111111111';
        const account = SymbolSDK.Account.createFromPrivateKey(privateKey, networkType);
        // replace with meta.generationHash (nodeUrl + '/block/1')
        const networkGenerationHash = '44D2225B8932C9A96DCB13508CBCDFFA9A9663BFBA2354FEEC8FCFCB7E19846C';
        const signedTransaction = account.sign(transferTransaction, networkGenerationHash);

        // replace with node endpoint
        const nodeUrl = 'http://api-01.us-west-1.symboldev.network:3000';
        const repositoryFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
        const transactionHttp = repositoryFactory.createTransactionRepository();

        transactionHttp
            .announce(signedTransaction)
            .subscribe(
                (x) => console.log(x),
                (err) => console.error(err));
    };

    render() {
        return (
            <Card>
                <Container>
                    <Card.Title className='mt-2'>
                        Sending Mosaic
                    </Card.Title>
                    <Card.Body>

                        <Row>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            Your MosaicId
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder='Input your Mosaic ID'/>
                                </InputGroup>
                            </Col>

                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            Mosaic Unit
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder='Input Mosaic Unit'/>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            Network Type
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled value='TEST_NET'/>
                                </InputGroup>
                            </Col>

                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            Network Currency Divisibility
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled value='6'/>
                                </InputGroup>
                            </Col>
                        </Row>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Recipient Address
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder='Input Recipient Address'/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Messages
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder='Input Messages'/>
                        </InputGroup>


                        <Button onClick={this.onSendMosaic} className='mb-2'>Send Mosaic</Button>

                    </Card.Body>
                </Container>
            </Card>
        );
    }

}

export default SendingMosaic;