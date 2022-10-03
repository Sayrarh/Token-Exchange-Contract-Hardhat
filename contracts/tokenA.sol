//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract tokenA is ERC20, Ownable {
    uint public constant TotalSupply = 10000000 * 10 ** 18;

    constructor() ERC20("tokenA", "TAN") {
         _mint(msg.sender, 2000e18);
    }

    function mint(uint _amount) internal {
        _mint(msg.sender, _amount);
    }
}