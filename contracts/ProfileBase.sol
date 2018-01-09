pragma solidity ^0.4.16;

contract ProfileBase {
  mapping (address => UserInfo) public userList;

  struct UserInfo {
    address accountAddress;
    string name;
    string description;
    string profileUrl;
    uint createBlock;
    uint updateBlock;
  }

}