import { Reference, findReference, FindReferenceError, validateTransfer } from "@solana/pay";
import { Connection, ConfirmedSignatureInfo, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";

export const ValidatePayment = async (reference:Reference, connection:Connection, MERCHANT_WALLET:PublicKey, amount:BigNumber, splToken:PublicKey) => {
    let signatureInfo: ConfirmedSignatureInfo;

    return new Promise((resolve, reject) => {
        /**
         * Retry until we find the transaction
         *
         * If a transaction with the given reference can't be found, the `findReference`
         * function will throw an error. There are a few reasons why this could be a false negative:
         *
         * - Transaction is not yet confirmed
         * - Customer is yet to approve/complete the transaction
         *
         */
        const interval = setInterval(async () => {
            try {
                /* Check if there is a transaction recorded onchain with the same reference */
                signatureInfo = await findReference(connection, reference, { finality: 'confirmed' });
                clearInterval(interval);

                try {
                    /* Validate whether the transaction info is same with the order or not */
                    await validateTransfer(connection, signatureInfo.signature, { recipient: MERCHANT_WALLET, amount:amount, splToken:splToken});
                    resolve('validated')
                } catch (error) {
                    reject('Unmatched Payment Info!')
                }

            } catch (error: any) {
                if (!(error instanceof FindReferenceError)) {
                    console.error(error);
                    clearInterval(interval);
                    reject(error);
                }
            }
        }, 2000);
    });
}

