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
  const xvi = "0x3419ee2271238a6d316433ea8814e0a2212e2bb0565b1bbe2eed2aca80189f0c";
  const proof = "0x2EC304A7F4775C232BC9E7C6A6A412815F189528A561129C4A17006F91BE2F17"
  // Deploy the contract.
  console.log("deploying succ:",address);

  await task.connect(owner).provideXvi(xvi, proof);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });