import Array "mo:base/Array";
import Types "./types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";

actor {

  type User = Types.User;

  public type Errors = {
    #Unauthorized;
    #TokenNotExist;
    #InvalidOperator;
    #UserAlreadyExists;
    #UserDoesNotExists;
  };

  public type UserResult = {
    #Ok: (User);
    #Err: Errors;
  };

  private stable var usersEntries : [(Principal, User)] = [];
  private var users = HashMap.HashMap<Principal, User>(1, Principal.equal, Principal.hash);

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  private func _userExists(who: Principal): ?User {
    switch(users.get(who)) {
      case(?user) { return ?user };
      case(_) { return null };
    }
  };


  public shared(msg) func createUser(_name: ?Text, _surname: ?Text, _username: Text) : async UserResult {
    switch(_userExists(msg.caller)) {
      case(?user) { return #Err(#UserAlreadyExists) };
      case(_) {
        let new_user : User = {
          name = _name;
          surname = _surname;
          username = _username;
        };
        users.put(msg.caller, new_user);
        return #Ok(new_user);
      }
    }
  };

  //query
  public query func getUser(who: Principal) : async UserResult {
    switch(users.get(who)) {
      case(?user) { return #Ok(user) };
      case(_) { return #Err(#UserDoesNotExists) };
    }
  };

  public query func getUsers(): async [User] {
    Iter.toArray(Iter.map(users.entries(), func (i: (Principal, User)): User { i.1 } ))
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
