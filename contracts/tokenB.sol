//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract tokenB is ERC20, Ownable {
    uint public constant TotalSupply = 10000000 * 10 ** 18;


    constructor() ERC20("tokenB", "TBN") {
        _mint(address(this), TotalSupply);
    }

    function transferTo(address _addr, uint _amount) external {
    uint balContract = balanceOf(address(this));
    require(balContract >= _amount, "not enough balance");
    _transfer(address(this), _addr, _amount);
    }
}