import { ethers } from "hardhat";

async function main() {

  //DEPLOYING THE CONTRACT 

  const SwapContract = await ethers.getContractFactory("Swapper");
  const swapContract = await SwapContract.deploy();

  await swapContract.deployed();
  console.log("Swap contract address", swapContract.address);

  //DEPLOYING THE TOKEN CONTRACT
  const TokenA = await ethers.getContractFactory("tokenA")
  const tokenA = await TokenA.deploy();
  await tokenA.deployed();
  console.log("Token A contract address", tokenA.address);

  const TokenB = await ethers.getContractFactory("tokenB")
  const tokenB = await TokenB.deploy();
  await tokenB.deployed();

  console.log("Token B contract address", tokenB.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
