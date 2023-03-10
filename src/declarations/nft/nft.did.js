export const idlFactory = ({ IDL }) => {
  const Errors = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'TokenNotExist' : IDL.Null,
    'InvalidOperator' : IDL.Null,
  });
  const TxReceipt = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : Errors });
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
  const MintResult = IDL.Variant({
    'Ok' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'Err' : Errors,
  });
  const TokenMetadata__1 = IDL.Record({
    'name' : IDL.Text,
    'filetype' : IDL.Text,
    'attributes' : IDL.Vec(Attribute),
    'location' : Location,
  });
  const Time = IDL.Int;
  const TokenInfoExt = IDL.Record({
    'owner' : IDL.Principal,
    'metadata' : IDL.Opt(TokenMetadata__1),
    'operator' : IDL.Opt(IDL.Principal),
    'timestamp' : Time,
    'index' : IDL.Nat,
  });
  const Metadata = IDL.Record({
    'owner' : IDL.Principal,
    'desc' : IDL.Text,
    'logo' : IDL.Text,
    'name' : IDL.Text,
    'totalSupply' : IDL.Nat,
    'cycles' : IDL.Nat,
    'symbol' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Principal, 'err' : Errors });
  const Result_2 = IDL.Variant({ 'ok' : TokenInfoExt, 'err' : Errors });
  const Operation = IDL.Variant({
    'transferFrom' : IDL.Null,
    'burn' : IDL.Null,
    'approveAll' : IDL.Null,
    'mint' : IDL.Opt(TokenMetadata__1),
    'approve' : IDL.Null,
    'setMetadata' : IDL.Null,
    'transfer' : IDL.Null,
    'revokeAll' : IDL.Null,
  });
  const Record = IDL.Variant({
    'metadata' : IDL.Opt(TokenMetadata__1),
    'user' : IDL.Principal,
  });
  const TxRecord = IDL.Record({
    'op' : Operation,
    'to' : Record,
    'tokenIndex' : IDL.Opt(IDL.Nat),
    'from' : Record,
    'timestamp' : Time,
    'caller' : IDL.Principal,
    'index' : IDL.Nat,
  });
  const UserInfoExt = IDL.Record({
    'allowedTokens' : IDL.Vec(IDL.Nat),
    'tokens' : IDL.Vec(IDL.Nat),
    'operators' : IDL.Vec(IDL.Principal),
    'allowedBy' : IDL.Vec(IDL.Principal),
  });
  const Result_1 = IDL.Variant({ 'ok' : UserInfoExt, 'err' : Errors });
  return IDL.Service({
    'approve' : IDL.Func([IDL.Nat, IDL.Principal], [TxReceipt], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'batchMint' : IDL.Func(
        [IDL.Principal, IDL.Vec(IDL.Opt(TokenMetadata))],
        [MintResult],
        [],
      ),
    'batchTransferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Vec(IDL.Nat)],
        [TxReceipt],
        [],
      ),
    'burn' : IDL.Func([IDL.Nat], [TxReceipt], []),
    'buy' : IDL.Func([IDL.Nat], [MintResult], []),
    'desc' : IDL.Func([], [IDL.Text], ['query']),
    'getAllTokens' : IDL.Func([], [IDL.Vec(TokenInfoExt)], ['query']),
    'getMetadata' : IDL.Func([], [Metadata], ['query']),
    'getOperator' : IDL.Func([IDL.Nat], [Result], ['query']),
    'getSalesSize' : IDL.Func([], [IDL.Nat], ['query']),
    'getToken' : IDL.Func([IDL.Nat], [IDL.Opt(TokenInfoExt)], ['query']),
    'getTokenInfo' : IDL.Func([IDL.Nat], [Result_2], ['query']),
    'getTokenPrice' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Float64)], ['query']),
    'getTransaction' : IDL.Func([IDL.Nat], [TxRecord], ['query']),
    'getTransactions' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(TxRecord)],
        ['query'],
      ),
    'getUserInfo' : IDL.Func([IDL.Principal], [Result_1], ['query']),
    'getUserTokens' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(TokenInfoExt)],
        ['query'],
      ),
    'getUserTransactionAmount' : IDL.Func(
        [IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'getUserTransactions' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Nat],
        [IDL.Vec(TxRecord)],
        ['query'],
      ),
    'historySize' : IDL.Func([], [IDL.Nat], ['query']),
    'init' : IDL.Func([IDL.Principal], [], []),
    'isApprovedForAll' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Bool],
        ['query'],
      ),
    'logo' : IDL.Func([], [IDL.Text], ['query']),
    'mint' : IDL.Func(
        [IDL.Principal, IDL.Opt(TokenMetadata)],
        [MintResult],
        [],
      ),
    'mintForMyself' : IDL.Func(
        [IDL.Bool, IDL.Text, IDL.Vec(IDL.Nat8), IDL.Text],
        [MintResult],
        [],
      ),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'ownerOf' : IDL.Func([IDL.Nat], [Result], ['query']),
    'sale' : IDL.Func([IDL.Nat, IDL.Float64], [MintResult], []),
    'setApprovalForAll' : IDL.Func([IDL.Principal, IDL.Bool], [TxReceipt], []),
    'setOwner' : IDL.Func([IDL.Principal], [IDL.Principal], []),
    'setTokenMetadata' : IDL.Func([IDL.Nat, TokenMetadata], [TxReceipt], []),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [TxReceipt],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
