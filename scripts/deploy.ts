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

  const valid2 = "0xAEB9219D416D28f2EADB0A6C414E2776Fd9CD879"
  const valid1 = "0x637CcDeBB20f849C0AA1654DEe62B552a058EA87"

    
    //Interaction with the token contracts
    const TokenAInteract = await ethers.getContractAt("tokenA", tokenA.address);
    const TokenBInteract = await ethers.getContractAt("tokenB", tokenB.address);

    const amt = await ethers.utils.parseUnits("100")

    const transferA = await TokenAInteract.transferTo(valid1, amt);
    const transferB = await TokenBInteract.transferTo(valid2, amt);

    console.log("Transfer tokens A:", transferA);
    console.log("Transfer tokens B:", transferB);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
