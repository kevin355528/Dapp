import { ethers } from "hardhat";

const hre = require("hardhat");



async function main() {
  // Get the example accounts we'll be working with.
  const [owner] = await hre.ethers.getSigners();

  // We get the contract to deploy.
  const reward = ethers.parseEther("1")
  const Task = await ethers.getContractFactory("SC_j");
  const data = "test data"
  const cert = "00000116936590690xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  const req_pk = "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  const CA_pk =  "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  const ans_ = [1,2]
  const task = await Task.deploy(reward, 1000, data, cert, req_pk, CA_pk, ans_)
  await task.waitForDeployment();
  const address = await task.getAddress();

  // Deploy the contract.
  console.log("deploying succ:",address);

  await task.connect(owner).Aggregate_answer(7414,5);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });