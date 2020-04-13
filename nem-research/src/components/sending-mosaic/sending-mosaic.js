import React from 'react';
import {Button, Card, Col, Container, FormControl, InputGroup, Row} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';


class SendingMosaic extends React.Component {
    constructor() {
        super();
        this.state = {
            mosaicId: '',
            mosaicUnit: '',
            mosaicDivisibility: '',
            recipientAddress: '',
            privateKey: '',
            messages: ''
        };
    }


    onInputMosaicID = (event) => {
        this.setState({
            mosaicId: event.target.value.trim()
        });
        this.onGetMosaicInfo(event.target.value.trim());
    };

    onGetMosaicInfo = (mosaicID) => {
        // replace with mosaic id
        // const mosaicIdHex = '3FE62E950DF48099';
        const mosaicId = new SymbolSDK.MosaicId(mosaicID);

        // replace with node endpoint
        const nodeUrl = 'http://api-01.us-west-1.symboldev.network:3000';
        const repositoryFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
        const mosaicHttp = repositoryFactory.createMosaicRepository();

        mosaicHttp
            .getMosaic(mosaicId)
            .subscribe(
                (mosaicInfo) =>
                    this.setState({
                        mosaicDivisibility: mosaicInfo.divisibility
                    }),
                (err) => console.error(err));
    };

    onInputAddressChange = (event) => {
        this.setState(
            {recipientAddress: event.target.value.trim()}
        );
    };

    onInputMosaicAmount = (event) => {
        this.setState(
            {mosaicUnit: event.target.value.trim()}
        );
    };

    onInputMessage = (event) => {
        this.setState(
            {messages: event.target.value.trim()}
        );
    };

    onInputPrivateKey = (event) => {
        this.setState(
            {privateKey: event.target.value.trim()}
        );
    };

    onSendMosaic = () => {
        // Defining a transaction
        // replace with recipient address
        const nodeUrl = 'http://api-01.us-west-1.symboldev.network:3000';
        const recipientAddress = SymbolSDK.Address.createFromRawAddress(this.state.recipientAddress);
        // replace with network type
        const networkType = SymbolSDK.NetworkType.TEST_NET;
        // replace with symbol.xym id
        const networkCurrencyMosaicId = new SymbolSDK.MosaicId(this.state.mosaicId);
        // replace with network currency divisibility

        const transferTransaction = SymbolSDK.TransferTransaction.create(
            SymbolSDK.Deadline.create(),
            recipientAddress,
            [new SymbolSDK.Mosaic(networkCurrencyMosaicId,
                SymbolSDK.UInt64.fromUint(this.state.mosaicUnit * Math.pow(10, this.state.mosaicDivisibility)))],
            SymbolSDK.PlainMessage.create(this.state.messages || ''),
            networkType,
            SymbolSDK.UInt64.fromUint(50000));


        // replace with sender private key
        const privateKey = this.state.privateKey;
        const account = SymbolSDK.Account.createFromPrivateKey(privateKey, networkType);
        // replace with meta.generationHash (nodeUrl + '/block/1')

        //Get hash number
        const repoFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
        const transactionHttp = repoFactory.createTransactionRepository();

        repoFactory.getGenerationHash().subscribe((hash) => {
            console.log(hash);
            const signedTransaction = account.sign(transferTransaction, hash);
            transactionHttp
                .announce(signedTransaction)
                .subscribe(
                    (x) => console.log(x),
                    (err) => console.error(err));
        }, error => console.log(error));

    };
    // getHash = () => {
    //     const nodeUrl = 'http://api-01.us-west-1.symboldev.network:3000';
    //     const hash = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
    //     hash.getGenerationHash().subscribe((hash) => {
    //         console.log(hash);
    //         console.log('olaola');
    //         console.log('olaola2');
    //         console.log('olaola3');
    //     });
    // };

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
                                    <FormControl onChange={this.onInputMosaicID} placeholder='Input your Mosaic ID'/>
                                </InputGroup>
                            </Col>

                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            Mosaic Unit
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl onChange={this.onInputMosaicAmount}
                                                 placeholder='Input Mosaic Unit'/>
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
                                    <FormControl disabled value={this.state.mosaicDivisibility}/>
                                </InputGroup>
                            </Col>
                        </Row>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Recipient Address
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={this.onInputAddressChange}
                                         placeholder='Input Recipient Address'/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Messages
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={this.onInputMessage} placeholder='Input Messages'/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Private Key
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={this.onInputPrivateKey} placeholder='Input Private Key'/>
                        </InputGroup>

                        <Button onClick={this.onSendMosaic} className='mb-2'>Send Mosaic</Button>
                        {/*<br/>*/}
                        {/*<Button onClick={this.getHash} className='mb-2'>get HASH</Button>*/}
                    </Card.Body>
                </Container>
            </Card>
        );
    }

}

export default SendingMosaic;