export const idlFactory = ({ IDL }) => {
  const UserExt = IDL.Record({
    'username' : IDL.Text,
    'name' : IDL.Opt(IDL.Text),
    'surname' : IDL.Opt(IDL.Text),
    'tokens' : IDL.Vec(IDL.Nat),
  });
  const Errors = IDL.Variant({
    'UserAlreadyExists' : IDL.Null,
    'UserDoesNotExists' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'TokenNotExist' : IDL.Null,
    'InvalidOperator' : IDL.Null,
  });
  const UserResult = IDL.Variant({ 'Ok' : UserExt, 'Err' : Errors });
  const Attribute = IDL.Record({ 'key' : IDL.Text, 'value' : IDL.Text });
  const Location = IDL.Variant({
    'Web' : IDL.Text,
    'AssetCanister' : IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Nat8)),
    'IPFS' : IDL.Text,
    'InCanister' : IDL.Vec(IDL.Nat8),
  });
  const TokenMetadata = IDL.Record({
    'name' : IDL.Text,
    'filetype' : IDL.Text,
    'attributes' : IDL.Vec(Attribute),
    'location' : Location,
  });
  const Time = IDL.Int;
  const TokenInfoExt = IDL.Record({
    'owner' : IDL.Principal,
    'metadata' : IDL.Opt(TokenMetadata),
    'operator' : IDL.Opt(IDL.Principal),
    'timestamp' : Time,
    'index' : IDL.Nat,
  });
  const MintResult = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : Errors });
  return IDL.Service({
    'createUser' : IDL.Func(
        [IDL.Opt(IDL.Text), IDL.Opt(IDL.Text), IDL.Text],
        [UserResult],
        [],
      ),
    'getUser' : IDL.Func([IDL.Principal], [UserResult], ['query']),
    'getUserTokens' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(TokenInfoExt)],
        ['query'],
      ),
    'getUsers' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'mintToken' : IDL.Func(
        [IDL.Bool, IDL.Text, IDL.Vec(IDL.Nat8), IDL.Text],
        [MintResult],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
