// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NewERC20 is ERC20, Ownable {
    constructor(string memory name, string memory symbol)
    ERC20(name, symbol)
    Ownable(msg.sender)
    {
        // Constructor logic (if any) goes here
    }

    function mint(address to, uint256 amount) public onlyOwner payable {
        _mint(to, amount);
    }
}
