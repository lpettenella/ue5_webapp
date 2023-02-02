export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({
    'username' : IDL.Text,
    'name' : IDL.Opt(IDL.Text),
    'surname' : IDL.Opt(IDL.Text),
  });
  const Errors = IDL.Variant({
    'UserAlreadyExists' : IDL.Null,
    'UserDoesNotExists' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'TokenNotExist' : IDL.Null,
    'InvalidOperator' : IDL.Null,
  });
  const UserResult = IDL.Variant({ 'Ok' : User, 'Err' : Errors });
  return IDL.Service({
    'createUser' : IDL.Func(
        [IDL.Opt(IDL.Text), IDL.Opt(IDL.Text), IDL.Text],
        [UserResult],
        [],
      ),
    'getUser' : IDL.Func([IDL.Principal], [UserResult], ['query']),
    'getUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
