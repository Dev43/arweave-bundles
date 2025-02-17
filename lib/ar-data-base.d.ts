import { deepHash } from "./interface-deep-hash";
import { ArweaveUtils } from "./interface-utils";
import { CryptoInterface } from "./interface-crypto";
/**
 * The depdencies needed for operating on DataItems
 * These methods and interfaces are all available in arweave-js
 */
export interface Dependencies {
    crypto: CryptoInterface;
    utils: ArweaveUtils;
    deepHash: deepHash;
}
/**
 * Serialized format of a DataItem. Json.
 */
export declare class DataItemJson {
    owner: string;
    target: string;
    nonce: string;
    tags: {
        name: string;
        value: string;
    }[];
    data: string;
    signature: string;
    signatureType: number;
    id: string;
}
/**
 * Return the message that should be signed to produce a valid signature
 *
 * @param deps
 * @param d
 */
export declare function getSignatureData(deps: Dependencies, d: DataItemJson): Promise<Uint8Array>;
