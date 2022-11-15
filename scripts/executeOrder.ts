import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");

async function main() {
   
    const swapContractAddr = "0x1b4Fd88c2c0954e34b76Bc1127C98789E5D235Fb";
    const Interact = await ethers.getContractAt("Swap", swapContractAddr);

    //Token A and Token B address
    const tokenAaddr = "0x1DD3676139378ed93852E5f157f28D18F6558300";
    const tokenBaddr = "0x33d6eEDb1761D3c2eddbDfe8FD465A81e1f11F67";

    //Interaction with the token contracts
    const TokenAInteract = await ethers.getContractAt("tokenA", tokenAaddr);
    const TokenBInteract = await ethers.getContractAt("tokenB", tokenBaddr);

    const valid2 = "0xAEB9219D416D28f2EADB0A6C414E2776Fd9CD879"
    const valid1 = "0x637CcDeBB20f849C0AA1654DEe62B552a058EA87"

    const amtToswapB = await ethers.utils.parseUnits("50")
   
    // //execute order by valid2
     const approveB = await TokenBInteract.approve(swapContractAddr, amtToswapB)
    const executeOrder = await Interact.executeOrder("1");
    console.log("Execute Order", executeOrder)

    //Getting balance after swap
    const balAAfter = await TokenAInteract.balanceOf(valid1)
    const balAAftertokenB = await TokenBInteract.balanceOf(valid1)

    console.log("Balance of tokens after swap", balAAfter, balAAftertokenB)

    const balBAfter = await TokenAInteract.balanceOf(valid2)
    const balBAftertokenB = await TokenBInteract.balanceOf(valid2)

    console.log("Balance of tokens after swap", balBAfter, balBAftertokenB)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});