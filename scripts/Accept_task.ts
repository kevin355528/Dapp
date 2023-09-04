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
  const PK = "0x3b2841e0c17cba64be60b67f789fb540bedf4735cdb38b7da2cd501b9b0e6ca70632dd638091eca329d6fa7d8263457557040abc7d557f23d3d331736743ea5c";
  const ans_ = [1,2]
  const task = await Task.deploy(reward, 1000, data, cert, req_pk, CA_pk, ans_)
  await task.waitForDeployment();
  const address = await task.getAddress();

  // Deploy the contract.
  console.log("deploying succ:",address);

  const cost = {value: ethers.parseEther("0.006")};
  await task.connect(owner).Accept_task(cert, 1, 20, PK, 0, 5, cost);
  
  const TF = await task.Accept_task;
  console.log(TF);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });