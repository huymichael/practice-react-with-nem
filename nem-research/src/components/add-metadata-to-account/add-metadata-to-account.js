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

    // onAssignMetadata = () => {
    //     const nodeUrl = 'http://api-01.us-west-1.symboldev.network:3000';
    //     const key = SymbolSDK.KeyGenerator.generateUInt64Key(this.state.key);
    //     // replace with network type
    //     const networkType = SymbolSDK.NetworkType.TEST_NET;
    //     // replace with public key
    //     const recipientPublicKey = this.state.recipientPublicKey;
    //     const recipientAccount = SymbolSDK.PublicAccount
    //         .createFromPublicKey(recipientPublicKey, networkType);
    //     // replace with value
    //     const value = this.state.value;
    //     const accountMetadataTransaction = SymbolSDK.AccountMetadataTransaction
    //         .create(SymbolSDK.Deadline.create(),
    //             recipientAccount.publicKey,
    //             key,
    //             value.length,
    //             value,
    //             networkType);
    //
    //     // replace with bob private key
    //     const senderPrivateKey = this.state.senderPrivateKey;
    //     const senderAccount = SymbolSDK.Account.createFromPrivateKey(senderPrivateKey, networkType);
    //     const aggregateTransaction = SymbolSDK.AggregateTransaction
    //         .createBonded(SymbolSDK.Deadline.create(),
    //             [accountMetadataTransaction
    //                 .toAggregate(senderAccount.publicAccount)], networkType,
    //             [],
    //             SymbolSDK.UInt64.fromUint(2000000));
    //
    //
    //     const repoFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
    //     repoFactory.getGenerationHash().subscribe((hash) => {
    //         const networkGenerationHash = hash;
    //         const signedTransaction = senderAccount.sign(aggregateTransaction, networkGenerationHash);
    //         console.log(signedTransaction.hash);
    //         const mosaicHttp = repoFactory.createMosaicRepository();
    //         const mosaicId = new SymbolSDK.MosaicId(this.state.mosaicId);
    //         mosaicHttp
    //             .getMosaic(mosaicId)
    //             .subscribe(
    //                 (mosaicInfo) => {
    //                     this.setState({
    //                         mosaicDiv: mosaicInfo.divisibility
    //                     });
    //                     const hashLockTransaction = SymbolSDK.HashLockTransaction
    //                         .create(SymbolSDK.Deadline.create(),
    //                             new SymbolSDK.Mosaic(this.state.mosaicId,
    //                                 SymbolSDK.UInt64.fromUint(10 * Math.pow(10,
    //                                     this.state.mosaicDiv))),
    //                             SymbolSDK.UInt64.fromUint(480),
    //                             signedTransaction, networkType,
    //                             SymbolSDK.UInt64.fromUint(2000000));
    //                     const signedHashLockTransaction = senderAccount
    //                         .sign(hashLockTransaction, networkGenerationHash);
    //                     const listener = repoFactory.createListener();
    //                     const receiptHttp = repoFactory.createReceiptRepository();
    //                     const transactionHttp = repoFactory.createTransactionRepository();
    //                     const transactionService = new SymbolSDK
    //                         .TransactionService(transactionHttp, receiptHttp);
    //                     listener.open().then(() => {
    //                         transactionService
    //                             .announceHashLockAggregateBonded(signedHashLockTransaction,
    //                                 signedTransaction, listener)
    //                             .subscribe((x) => console.log(x),
    //                                 (err) => console.log(err), () => listener.close());
    //                     });
    //                 },
    //                 (err) => console.error(err));
    //     }, error => console.log(error));
    //
    // };
    onSendData = () => {
        // replace with key
        const key = SymbolSDK.KeyGenerator.generateUInt64Key('Michael');

        // replace with network type
        const networkType = SymbolSDK.NetworkType.TEST_NET;
        // replace with public key
        const alicePublicKey = '7E5D2563FC9D4A8162DAD6C482CBB135D4007A81747B67C91BFC21140B5FB924';
        const alicePublicAccount = SymbolSDK.PublicAccount.createFromPublicKey(alicePublicKey, networkType);
        // replace with value
        const value = 'Thai Coder';
        const accountMetadataTransaction = SymbolSDK.AccountMetadataTransaction
            .create(SymbolSDK.Deadline.create(), alicePublicAccount.publicKey, key, value.length, value, networkType);

        // replace with bob private key
        const bobPrivateKey = 'BFD81190D7147AA105B6B4E741CF77612B0D814255873066CAB10A5EEB09D036';
        const bobAccount = SymbolSDK.Account.createFromPrivateKey(bobPrivateKey, networkType);
        const aggregateTransaction = SymbolSDK.AggregateTransaction
            .createBonded(SymbolSDK.Deadline.create(),
                [accountMetadataTransaction
                    .toAggregate(bobAccount.publicAccount)],
                networkType, [],
                SymbolSDK.UInt64.fromUint(2000000));
        // replace with meta.generationHash (nodeUrl + '/block/1')
        const networkGenerationHash = '44D2225B8932C9A96DCB13508CBCDFFA9A9663BFBA2354FEEC8FCFCB7E19846C';
        const signedTransaction = bobAccount.sign(aggregateTransaction, networkGenerationHash);
        console.log(signedTransaction.hash);

        // replace with symbol.xym id
        const networkCurrencyMosaicId = new SymbolSDK.MosaicId('51A99028058245A8');
        // replace with network currency divisibility
        const networkCurrencyDivisibility = 0;
        const hashLockTransaction = SymbolSDK.HashLockTransaction.create(SymbolSDK.Deadline.create(),
            new SymbolSDK.Mosaic(networkCurrencyMosaicId, SymbolSDK.UInt64
                .fromUint(10 * Math.pow(10, networkCurrencyDivisibility))),
            SymbolSDK.UInt64.fromUint(480), signedTransaction, networkType, SymbolSDK.UInt64.fromUint(2000000));
        const signedHashLockTransaction = bobAccount.sign(hashLockTransaction, networkGenerationHash);


        // replace with node endpoint
        const nodeUrl = 'http://api-01.eu-central-1.symboldev.network:3000';
        const repositoryFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
        const listener = repositoryFactory.createListener();
        const receiptHttp = repositoryFactory.createReceiptRepository();
        const transactionHttp = repositoryFactory.createTransactionRepository();
        const transactionService = new SymbolSDK.TransactionService(transactionHttp, receiptHttp);
        listener.open().then(() => {
            transactionService
                .announceHashLockAggregateBonded(signedHashLockTransaction, signedTransaction, listener)
                .subscribe((x) => console.log(x), (err) => console.log(err), () => listener.close());
        });
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