import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");

async function main() {
   // Swap contract Address
    const swapAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const Interact = await ethers.getContractAt("Swapper", swapAddr);

    //Token A and Token B address
    const tokenAaddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const tokenBaddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

    //Interaction with the token contracts
    const TokenAInteract = await ethers.getContractAt("tokenA", tokenAaddr);
    const TokenBInteract = await ethers.getContractAt("tokenB", tokenBaddr);


    //setting up hardhat node signers
    let [valid1, valid2, valid3] = await ethers.getSigners();

    const amt = await ethers.utils.parseUnits("100")

    //Sending tokens to signer's addresses
    const sendMoneya = await TokenAInteract.transferTo(valid1.address, amt);
    const sendMoneyB = await TokenBInteract.transferTo(valid2.address, amt);

    console.log("Payment receipt A", sendMoneya)
    console.log("Payment receipt B", sendMoneyB)

    //Approving the swap contract to spend the tokens
    const amtToswapA = await ethers.utils.parseUnits("50")
    const approveA = await TokenAInteract.connect(valid1).approve(swapAddr, amtToswapA)

    console.log("Swap contract approved to send token A", approveA)

    const amtToswapB = await ethers.utils.parseUnits("70")
    const approveB = await TokenBInteract.connect(valid2).approve(swapAddr, amtToswapB)

    //Getting balance of tokens before swap
    const balABefore = await TokenAInteract.balanceOf(valid1.address)
    const balABeforetokenB = await TokenBInteract.balanceOf(valid1.address)

    console.log("Balance of tokens before swap", balABefore, balABeforetokenB)

    const balBBefore = await TokenAInteract.balanceOf(valid2.address)
    const balBBeforetokenB = await TokenBInteract.balanceOf(valid2.address)

    console.log("Balance of tokens before swap", balBBefore, balBBeforetokenB)

    //creating order by valid1
    const createOrder = await Interact.connect(valid1).createOrder(tokenAaddr,tokenBaddr,amtToswapA,amtToswapB);
    console.log("Order created", createOrder);

    //execute order by valid2
    const executeOrder = await Interact.connect(valid2).executeOrder("1");
    console.log("Execute Order", executeOrder)

    //Getting balance after swap
    const balAAfter = await TokenAInteract.balanceOf(valid1.address)
    const balAAftertokenB = await TokenBInteract.balanceOf(valid1.address)

    console.log("Balance of tokens after swap", balAAfter, balAAftertokenB)

    const balBAfter = await TokenAInteract.balanceOf(valid2.address)
    const balBAftertokenB = await TokenBInteract.balanceOf(valid2.address)

    console.log("Balance of tokens after swap", balBAfter, balBAftertokenB)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
