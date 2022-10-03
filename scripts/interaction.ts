import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");

async function main() {
    const swapAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const Interact = await ethers.getContractAt("Swapper", swapAddr);

    const TokenAInteract = await ethers.getContractAt("tokenA", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    const TokenBInteract = await ethers.getContractAt("tokenB", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
