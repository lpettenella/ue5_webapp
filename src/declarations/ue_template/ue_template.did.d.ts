import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Attribute { 'key' : string, 'value' : string }
export type Errors = { 'UserAlreadyExists' : null } |
  { 'UserDoesNotExists' : null } |
  { 'Unauthorized' : null } |
  { 'TokenNotExist' : null } |
  { 'InvalidOperator' : null };
export type Location = { 'Web' : string } |
  { 'AssetCanister' : [Principal, Uint8Array] } |
  { 'IPFS' : string } |
  { 'InCanister' : Uint8Array };
export type MintResult = { 'Ok' : bigint } |
  { 'Err' : Errors };
export type Time = bigint;
export interface TokenInfoExt {
  'owner' : Principal,
  'metadata' : [] | [TokenMetadata],
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
export interface UserExt {
  'username' : [] | [string],
  'name' : [] | [string],
  'surname' : [] | [string],
  'tokens' : Array<bigint>,
}
export type UserResult = { 'Ok' : UserExt } |
  { 'Err' : Errors };
export interface _SERVICE {
  'createUser' : ActorMethod<
    [[] | [string], [] | [string], [] | [string]],
    UserResult
  >,
  'getUser' : ActorMethod<[Principal], UserResult>,
  'getUserTokens' : ActorMethod<[Principal], Array<TokenInfoExt>>,
  'getUsers' : ActorMethod<[], Array<Principal>>,
  'greet' : ActorMethod<[string], string>,
  'mintToken' : ActorMethod<[boolean, string, Uint8Array, string], MintResult>,
}
