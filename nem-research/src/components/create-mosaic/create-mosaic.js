import React from 'react';
import {Button, Card, Container, FormControl, InputGroup} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';

class CreateMosaic extends React.Component {
    constructor() {
        super();
        this.state = {
            privateKey: ''
        };
    }

    onInputPrivateKey = (event) => {
        this.setState({
            privateKey: event.target.value
        });
    };

    onCreateMosaic = () => {
        // replace with network type
        const networkType = SymbolSDK.NetworkType.TEST_NET;
        // replace with private key
        const account = SymbolSDK.Account.createFromPrivateKey(this.state.privateKey.trim(), networkType);
        // replace with duration (in blocks)
        const duration = SymbolSDK.UInt64.fromUint(0);
        // replace with custom mosaic flags
        const isSupplyMutable = true;
        const isTransferable = true;
        const isRestrictable = true;
        // replace with custom divisibility
        const divisibility = 0;

        const nonce = SymbolSDK.MosaicNonce.createRandom();
        const mosaicDefinitionTransaction = SymbolSDK.MosaicDefinitionTransaction.create(
            SymbolSDK.Deadline.create(),
            nonce,
            SymbolSDK.MosaicId.createFromNonce(nonce, account.publicAccount),
            SymbolSDK.MosaicFlags.create(isSupplyMutable, isTransferable, isRestrictable),
            divisibility,
            duration,
            networkType);

        // replace with mosaic units to increase
        const delta = 500;
        const mosaicSupplyChangeTransaction = SymbolSDK.MosaicSupplyChangeTransaction
            .create(SymbolSDK.Deadline.create(),
                mosaicDefinitionTransaction.mosaicId,
                SymbolSDK.MosaicSupplyChangeAction.Increase,
                SymbolSDK.UInt64.fromUint(delta * Math.pow(10, divisibility)), networkType);


        const aggregateTransaction = SymbolSDK.AggregateTransaction
            .createComplete(SymbolSDK.Deadline.create(), [
                mosaicDefinitionTransaction.toAggregate(account.publicAccount),
                mosaicSupplyChangeTransaction.toAggregate(account.publicAccount)
            ], networkType, [], SymbolSDK.UInt64.fromUint(2000000));
        // replace with meta.generationHash (nodeUrl + '/block/1')
        const networkGenerationHash = '44D2225B8932C9A96DCB13508CBCDFFA9A9663BFBA2354FEEC8FCFCB7E19846C';
        const signedTransaction = account.sign(aggregateTransaction, networkGenerationHash);
        // replace with node endpoint
        const nodeUrl = 'http://api-01.us-west-1.symboldev.network:3000';
        const repositoryFactory = new SymbolSDK.RepositoryFactoryHttp(nodeUrl);
        const transactionHttp = repositoryFactory.createTransactionRepository();
        transactionHttp
            .announce(signedTransaction)
            .subscribe((x) => console.log(x), (err) => console.error(err));

    };

    render() {
        return (
            <Card>
                <Container className='mt-2 mb-2'>
                    <Card.Title>
                        Create Mosaic
                    </Card.Title>
                    <Card.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Private Key
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={this.onInputPrivateKey} placeholder='Input Private Key'/>
                        </InputGroup>
                    </Card.Body>
                    <Button onClick={this.onCreateMosaic}>
                        Create Mosaic
                    </Button>
                </Container>
            </Card>
        );
    }

}

export default CreateMosaic;