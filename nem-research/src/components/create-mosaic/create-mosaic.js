import React from 'react';
import {Card, Container} from 'react-bootstrap';
import * as SymbolSDK from 'symbol-sdk';

class CreateMosaic extends React.Component {
    render() {
        // replace with network type
        const networkType = SymbolSDK.NetworkType.TEST_NET;
// replace with private key
        const privateKey = '1111111111111111111111111111111111111111111111111111111111111111';
        const account = SymbolSDK.Account.createFromPrivateKey(privateKey, networkType);
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


        return (
            <Card>
                <Container className='mt-2'>
                    <Card.Title>
                        Create Mosaic
                    </Card.Title>

                </Container>

            </Card>
        );
    }

}

export default CreateMosaic;