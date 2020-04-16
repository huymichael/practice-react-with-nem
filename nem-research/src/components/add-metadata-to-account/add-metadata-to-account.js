import React from 'react';
import {Button, Card, Col, Container, FormControl, InputGroup, Row} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';

class AddMetadataToAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            key: '',
            value: '',
            recipientPublicKey: '',
            senderPrivateKey: '',
            mosaicId: '',
            mosaicDiv: '',

        };

    }

    onGetKey = (event) => {
        this.setState({key: event.target.value.trim()});
    };
    onGetValue = (event) => {
        this.setState({value: event.target.value.trim()});
    };
    onGePublicKey = (event) => {
        this.setState({recipientPublicKey: event.target.value.trim()});
    };
    onGetPrivateKey = (event) => {
        this.setState({senderPrivateKey: event.target.value.trim()});
    };
    onGetMosaicId = (event) => {
        this.setState({mosaicId: event.target.value.trim()});
    };
    
    onSendData = () => {
        const nodeUrl = 'http://api-01.eu-central-1.symboldev.network:3000';

        // replace with key
        const key = SymbolSDK.KeyGenerator.generateUInt64Key(this.state.key);

        // replace with network type
        const networkType = SymbolSDK.NetworkType.TEST_NET;
        // replace with public key
        const recipientPublicKey = this.state.recipientPublicKey;
        const recipientPublicAccount = SymbolSDK.PublicAccount.createFromPublicKey(recipientPublicKey, networkType);
        // replace with value
        const value = 'Thai';
        const accountMetadataTransaction = SymbolSDK.AccountMetadataTransaction
            .create(SymbolSDK.Deadline.create(), recipientPublicAccount.publicKey, key, value.length, value, networkType);

        // replace with bob private key
        const senderPrivateKey = this.state.senderPrivateKey;
        const senderAccount = SymbolSDK.Account.createFromPrivateKey(senderPrivateKey, networkType);
        const aggregateTransaction = SymbolSDK.AggregateTransaction
            .createBonded(SymbolSDK.Deadline.create(),
                [accountMetadataTransaction
                    .toAggregate(senderAccount.publicAccount)],
                networkType, [],
                SymbolSDK.UInt64.fromUint(2000000));
        // replace with meta.generationHash (nodeUrl + '/block/1')


        const repoFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
        const transactionHttp = repoFactory.createTransactionRepository();

        repoFactory.getGenerationHash().subscribe((hash) => {
            const networkGenerationHash = hash;
            const signedTransaction = senderAccount.sign(aggregateTransaction, networkGenerationHash);
            console.log('Transaction HASH');
            console.log(signedTransaction.hash);


            // replace with symbol.xym id
            const networkCurrencyMosaicId = new SymbolSDK.MosaicId(this.state.mosaicId);

            const mosaicHttp = repoFactory.createMosaicRepository();
            mosaicHttp
                .getMosaic(networkCurrencyMosaicId)
                .subscribe(
                    (mosaicInfo) => {
                        this.setState({
                            mosaicDiv: mosaicInfo.divisibility
                        });
                        const hashLockTransaction = SymbolSDK.HashLockTransaction
                            .create(SymbolSDK.Deadline.create(),
                                new SymbolSDK.Mosaic(networkCurrencyMosaicId, SymbolSDK.UInt64
                                    .fromUint(10 * Math.pow(10, this.state.mosaicDiv))),
                                SymbolSDK.UInt64
                                    .fromUint(480),
                                signedTransaction,
                                networkType,
                                SymbolSDK.UInt64.fromUint(2000000));
                        const signedHashLockTransaction = senderAccount
                            .sign(hashLockTransaction, networkGenerationHash);

                        // replace with node endpoint
                        const repositoryFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
                        const listener = new SymbolSDK.Listener('ws://api-01.eu-central-1.symboldev.network:3000', WebSocket);
                        const receiptHttp = repositoryFactory.createReceiptRepository();
                        // const transactionHttp = repositoryFactory.createTransactionRepository();
                        const transactionService = new SymbolSDK.TransactionService(transactionHttp, receiptHttp);
                        listener.open().then(() => {
                            transactionService
                                .announceHashLockAggregateBonded(signedHashLockTransaction, signedTransaction, listener)
                                .subscribe((x) => console.log(x),
                                    (err) => console.log(err),
                                    () => listener.close());
                        });
                    },
                    (err) => console.error(err));
        }, error => console.log(error));
    };

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Container>
                        <Card.Title className='mt-2'>Add Metadata To Account</Card.Title>
                        <Card.Body>

                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                Key
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl onChange={this.onGetKey}
                                                     placeholder='Key'/>
                                    </InputGroup>
                                </Col>

                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                Value
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl onChange={this.onGetValue}
                                                     placeholder='Value'/>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        Recipient Account Public Key
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={this.onGePublicKey}
                                             placeholder='Input Public Key'/>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        MosaicId
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={this.onGetMosaicId}
                                             placeholder='Input MosaicID'/>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        Sender Private Key
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={this.onGetPrivateKey}
                                             placeholder='Input Private Key'/>
                            </InputGroup>
                            <br/>
                            <Button onClick={this.onSendData}>
                                Add Meta
                            </Button>
                        </Card.Body>
                    </Container>
                </Card>
            </React.Fragment>
        );
    }
}

export default AddMetadataToAccount;