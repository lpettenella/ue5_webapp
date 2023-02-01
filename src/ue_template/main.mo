import Array "mo:base/Array";
import Types "./types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor {

  type User = Types.User;

  private stable var usersEntries : [(Principal, User)] = [];
  private var users = HashMap.HashMap<Principal, User>(1, Principal.equal, Principal.hash);

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
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
