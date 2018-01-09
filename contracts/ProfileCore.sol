pragma solidity ^0.4.16;

import "./ProfileBase.sol";

/**
　* Owned
　* 
　*/
contract Owned {
  address public owner;

  // event
  event TransferOwnership(address oldaddr, address newaddr);

  // modifier
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
    }

  /**
   * Constructor
   */
  function Owned() public {
    owner = msg.sender;
  }

  /**
   * Transfer Ownership
   */
  function transferOwnership(address _new) onlyOwner public {
    address oldaddr = owner;
    owner = _new;
    TransferOwnership(oldaddr, owner);
  }
}


/**
　* ProfileCore
　* 
　*/ 
contract ProfileCore is Owned, ProfileBase {
	// event
  event SetUserInfo(address addr, string name);

  /**
   * Set user info
   */
  function setUserInfo(string _name, string _description, string _profileUrl) public {
    userList[msg.sender].accountAddress = msg.sender;
    userList[msg.sender].name = _name;
    userList[msg.sender].description = _description;
    userList[msg.sender].profileUrl = _profileUrl;
    userList[msg.sender].createBlock = userList[msg.sender].createBlock > 0 ? userList[msg.sender].createBlock : block.number;
    userList[msg.sender].updateBlock = block.number;

    SetUserInfo(msg.sender, _name);
  }

  /**
   * Get user info
   */
  function getUserInfo() public constant returns (
    address accountAddress,
    string name,
    string description,
    string profileUrl,
    uint createBlock,
    uint updateBlock
  ) {
    UserInfo memory userInfo = userList[msg.sender];
    
    accountAddress = userInfo.accountAddress;
    name = userInfo.name;
    description = userInfo.description;
    profileUrl = userInfo.profileUrl;
    createBlock = userInfo.createBlock;
    updateBlock = userInfo.updateBlock;
  }

}
