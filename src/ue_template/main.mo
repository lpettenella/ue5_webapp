import Array "mo:base/Array";
import Types "./types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";
import TrieSet "mo:base/TrieSet";

import Buffer "mo:base/Buffer";
import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Prelude "mo:base/Prelude";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Blob "mo:base/Blob";

actor {

  type User = Types.User;
  type UserExt = Types.UserExt;
  type TokenMetadata = Types.TokenMetadata;
  type TokenInfo = Types.TokenInfo;
  type TokenInfoExt = Types.TokenInfoExt;

  public type Errors = {
    #Unauthorized;
    #TokenNotExist;
    #InvalidOperator;
    #UserAlreadyExists;
    #UserDoesNotExists;
  };

  public type UserResult = {
    #Ok: (UserExt);
    #Err: Errors;
  };

  public type MintResult = {
    #Ok: Nat;
    #Err: Errors;
  };

  private stable var usersEntries : [(Principal, User)] = [];
  private stable var totalSupply_: Nat = 0;
  private stable var blackhole: Principal = Principal.fromText("aaaaa-aa");
  
  private var users = HashMap.HashMap<Principal, User>(1, Principal.equal, Principal.hash);
  private var tokens = HashMap.HashMap<Nat, TokenInfo>(1, Nat.equal, Hash.hash);
  

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  private func _userExt(user: User): UserExt {
    return {
      name = user.name;
      surname = user.surname;
      username = user.username;
      tokens = TrieSet.toArray(user.tokens);
    }
  };

  private func _tokenInfotoExt(info: TokenInfo) : TokenInfoExt {
    return {
        index = info.index;
        owner = info.owner;
        metadata = info.metadata;
        timestamp = info.timestamp;
        operator = info.operator;
    };
  };

  private func _unwrap<T>(x : ?T) : T =
    switch x {
      case null { Prelude.unreachable() };
      case (?x_) { x_ };
  };

  private func _userExists(who: Principal): ?User {
    switch(users.get(who)) {
      case(?user) { return ?user };
      case(_) { return null };
    }
  };

  private func _addTokenTo(to: Principal, tokenId: Nat) {
      switch(users.get(to)) {
          case (?user) {
              user.tokens := TrieSet.put(user.tokens, tokenId, Hash.hash(tokenId), Nat.equal);
              users.put(to, user);
          };
          case _ {
              return;
          };
      }
  }; 

  public shared(msg) func createUser(_name: ?Text, _surname: ?Text, _username: Text) : async UserResult {
    switch(users.get(msg.caller)) {
      case(?user) { return #Err(#UserAlreadyExists) };
      case(_) {
        let new_user : User = {
          var name = _name;
          var surname = _surname;
          var username = _username;
          var tokens = TrieSet.empty<Nat>()
        };
        users.put(msg.caller, new_user);
        return #Ok(_userExt(new_user));
      }
    }
  };

  public shared(msg) func mintToken(isPrivate: Bool, contentType: Text, payload: Blob, nftname: Text): async MintResult {
        let metadata : TokenMetadata = {
            attributes = [{ key = "isPrivate"; value = Bool.toText(isPrivate); }];
            filetype = contentType;
            location = #InCanister(payload);
            name = nftname;
        };

        let token: TokenInfo = {
            index = totalSupply_;
            var owner = msg.caller;
            var metadata = ?metadata;
            var operator = null;
            timestamp = Time.now();
        };
        tokens.put(totalSupply_, token);
        _addTokenTo(msg.caller, totalSupply_);
        totalSupply_ += 1;
        return #Ok(token.index);
    };

  //query
  public query func getUser(who: Principal) : async UserResult {
    switch(users.get(who)) {
      case(?user) { return #Ok(_userExt(user)) };
      case(_) { return #Err(#UserDoesNotExists) };
    }
  };

  public query func getUsers(): async [Principal] {
    Iter.toArray(Iter.map(users.entries(), func (i: (Principal, User)): Principal { i.0 } ))
  };

  public query func getUserTokens(owner: Principal) : async [TokenInfoExt] {
    let tokenIds = switch (users.get(owner)) {
        case (?user) {
            TrieSet.toArray(user.tokens)
        };
        case _ {
            []
        };
    };
    let ret = Buffer.Buffer<TokenInfoExt>(tokenIds.size());

    for(id in Iter.fromArray(tokenIds)) {
        ret.add(_tokenInfotoExt(_unwrap(tokens.get(id))));
    };
    return Buffer.toArray(ret);
  };

  //upgrade functions 
  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    type UserInfo = Types.UserInfo;
    users := HashMap.fromIter<Principal, User>(usersEntries.vals(), 1, Principal.equal, Principal.hash);
  };

};
