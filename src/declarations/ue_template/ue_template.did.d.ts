import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Errors = { 'UserAlreadyExists' : null } |
  { 'UserDoesNotExists' : null } |
  { 'Unauthorized' : null } |
  { 'TokenNotExist' : null } |
  { 'InvalidOperator' : null };
export interface User {
  'username' : string,
  'name' : [] | [string],
  'surname' : [] | [string],
}
export type UserResult = { 'Ok' : User } |
  { 'Err' : Errors };
export interface _SERVICE {
  'createUser' : ActorMethod<
    [[] | [string], [] | [string], string],
    UserResult
  >,
  'getUser' : ActorMethod<[Principal], UserResult>,
  'getUsers' : ActorMethod<[], Array<User>>,
  'greet' : ActorMethod<[string], string>,
}
