import { ethers } from "hardhat";

async function main() {
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
  console.log("deploying succ:",address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
