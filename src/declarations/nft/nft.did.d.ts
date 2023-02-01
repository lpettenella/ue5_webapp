import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Attribute { 'key' : string, 'value' : string }
export type Errors = { 'Unauthorized' : null } |
  { 'TokenNotExist' : null } |
  { 'InvalidOperator' : null };
export type Location = { 'Web' : string } |
  { 'AssetCanister' : [Principal, Uint8Array] } |
  { 'IPFS' : string } |
  { 'InCanister' : Uint8Array };
export interface Metadata {
  'owner' : Principal,
  'desc' : string,
  'logo' : string,
  'name' : string,
  'totalSupply' : bigint,
  'cycles' : bigint,
  'symbol' : string,
}
export type MintResult = { 'Ok' : [bigint, bigint] } |
  { 'Err' : Errors };
export type Operation = { 'transferFrom' : null } |
  { 'burn' : null } |
  { 'approveAll' : null } |
  { 'mint' : [] | [TokenMetadata__1] } |
  { 'approve' : null } |
  { 'setMetadata' : null } |
  { 'transfer' : null } |
  { 'revokeAll' : null };
export type Record = { 'metadata' : [] | [TokenMetadata__1] } |
  { 'user' : Principal };
export type Result = { 'ok' : Principal } |
  { 'err' : Errors };
export type Result_1 = { 'ok' : UserInfoExt } |
  { 'err' : Errors };
export type Result_2 = { 'ok' : TokenInfoExt } |
  { 'err' : Errors };
export type Time = bigint;
export interface TokenInfoExt {
  'owner' : Principal,
  'metadata' : [] | [TokenMetadata__1],
  'operator' : [] | [Principal],
  'timestamp' : Time,
  'index' : bigint,
}
export interface TokenMetadata {
  'name' : string,
  'filetype' : string,
  'attributes' : Array<Attribute>,
  'location' : Location,
}
export interface TokenMetadata__1 {
  'name' : string,
  'filetype' : string,
  'attributes' : Array<Attribute>,
  'location' : Location,
}
export type TxReceipt = { 'Ok' : bigint } |
  { 'Err' : Errors };
export interface TxRecord {
  'op' : Operation,
  'to' : Record,
  'tokenIndex' : [] | [bigint],
  'from' : Record,
  'timestamp' : Time,
  'caller' : Principal,
  'index' : bigint,
}
export interface UserInfoExt {
  'allowedTokens' : Array<bigint>,
  'tokens' : Array<bigint>,
  'operators' : Array<Principal>,
  'allowedBy' : Array<Principal>,
}
export interface _SERVICE {
  'approve' : ActorMethod<[bigint, Principal], TxReceipt>,
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'batchMint' : ActorMethod<
    [Principal, Array<[] | [TokenMetadata]>],
    MintResult
  >,
  'batchTransferFrom' : ActorMethod<
    [Principal, Principal, Array<bigint>],
    TxReceipt
  >,
  'burn' : ActorMethod<[bigint], TxReceipt>,
  'buy' : ActorMethod<[bigint], MintResult>,
  'desc' : ActorMethod<[], string>,
  'getAllTokens' : ActorMethod<[], Array<TokenInfoExt>>,
  'getMetadata' : ActorMethod<[], Metadata>,
  'getOperator' : ActorMethod<[bigint], Result>,
  'getSalesSize' : ActorMethod<[], bigint>,
  'getToken' : ActorMethod<[bigint], [] | [TokenInfoExt]>,
  'getTokenInfo' : ActorMethod<[bigint], Result_2>,
  'getTokenPrice' : ActorMethod<[bigint], [] | [number]>,
  'getTransaction' : ActorMethod<[bigint], TxRecord>,
  'getTransactions' : ActorMethod<[bigint, bigint], Array<TxRecord>>,
  'getUserInfo' : ActorMethod<[Principal], Result_1>,
  'getUserTokens' : ActorMethod<[Principal], Array<TokenInfoExt>>,
  'getUserTransactionAmount' : ActorMethod<[Principal], bigint>,
  'getUserTransactions' : ActorMethod<
    [Principal, bigint, bigint],
    Array<TxRecord>
  >,
  'historySize' : ActorMethod<[], bigint>,
  'init' : ActorMethod<[Principal], undefined>,
  'isApprovedForAll' : ActorMethod<[Principal, Principal], boolean>,
  'logo' : ActorMethod<[], string>,
  'mint' : ActorMethod<[Principal, [] | [TokenMetadata]], MintResult>,
  'mintForMyself' : ActorMethod<
    [boolean, string, Uint8Array, string],
    MintResult
  >,
  'name' : ActorMethod<[], string>,
  'ownerOf' : ActorMethod<[bigint], Result>,
  'sale' : ActorMethod<[bigint, number], MintResult>,
  'setApprovalForAll' : ActorMethod<[Principal, boolean], TxReceipt>,
  'setOwner' : ActorMethod<[Principal], Principal>,
  'setTokenMetadata' : ActorMethod<[bigint, TokenMetadata], TxReceipt>,
  'symbol' : ActorMethod<[], string>,
  'totalSupply' : ActorMethod<[], bigint>,
  'transfer' : ActorMethod<[Principal, bigint], TxReceipt>,
  'transferFrom' : ActorMethod<[Principal, Principal, bigint], TxReceipt>,
}
