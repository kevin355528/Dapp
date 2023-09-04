// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SC_j {
    uint256 public task_time;
    uint256 public reward;
    // unit is finney  1000000000000000
    uint256 public staking;
    string internal PK_CA;
    string internal PK_req;
    string public cert_req;
    string public data;
    address public addr;
    address[] internal verifiers;
    bytes32[] public ans_hash;
    uint256[] public ans;
    struct vi {
        bool task_accept;
        bytes32 xvi;
        string cert;
        uint256 ID;
        uint256 unixTimeStamp_expire;
        bytes pk;
        uint256 ans;
        bytes32 proof;
        uint256 reputation;
    }
    mapping(uint => uint) public ans_count;
    mapping(address => vi) public verifier; 
    constructor(uint256 reward_, uint256 time, string memory data_, string memory cert, string memory req_pk, string memory CA_pk, uint256[] memory ans_) {
        for(uint i=0;i<ans_.length;i++) {
            ans.push(ans_[i]);
        }
        cert_req = cert;
        PK_CA = CA_pk;
        PK_req = req_pk;
        data = data_;
        reward = reward_;
        task_time = block.timestamp + time*60;
        addr = 0xa064B78aC6b95980747ceD9fb02532D390Ea4aF9;
        bytes32 ans_1 = keccak256(abi.encodePacked(ans[0]));
        bytes32 ans_2 = keccak256(abi.encodePacked(ans[1]));
        ans_hash.push(ans_1);
        ans_hash.push(ans_2);
    }
    function Accept_task(string memory cert, uint ID, uint unixTimeStamp, bytes memory pk, uint32 count, uint32 rep) public payable returns(bool) {
        require(msg.value == Stake_Price(count, rep), "Wrong value!");
        require(address(bytes20(uint160(uint256(keccak256(pk))))) == addr, "You couldn't use this certificate");
        //require(unixTimeStamp > block.timestamp + task_time, "Your certificate would expired when the ans doesn't aggregate successfully yet.");
        staking += msg.value;
        verifiers.push(msg.sender);
        verifier[msg.sender].cert = cert;
        verifier[msg.sender].task_accept = true;
        verifier[msg.sender].ID = ID;
        verifier[msg.sender].unixTimeStamp_expire = unixTimeStamp;
        verifier[msg.sender].pk = pk;
        return (true);
    }

    function Stake_Price(uint32 count, uint32 rep) view public returns(uint) {
        uint256 penalty;
        if(count>=5 && count<10) penalty = 1;
        if(count>=10) penalty = 2;
        if(penalty == 0) {
            return (reward/10000 * (110-rep*10));
        }
        else {
            return (reward/10000 * penalty*(110-rep*10));
        }
    }
    
    function provideXvi(bytes32 xvi, bytes32 proof) public returns(bool) { //string memory, string memory, string memory) {
        require(verifier[msg.sender].task_accept, "You have not accepted this task.");
        verifier[msg.sender].xvi = xvi;
        verifier[msg.sender].proof = proof;
        return (true);
    }

    function Aggregate_answer(uint256 random_num, uint256 rep) public  returns(uint x) {
        require(verifier[msg.sender].task_accept, "You have not accepted this task.");
        require(block.timestamp >= task_time, "It's not a time to aggregate answer.");
        bytes32 ran_hash = keccak256(abi.encodePacked(random_num));
        if(keccak256(abi.encodePacked(ans_hash[0], ran_hash)) == verifier[msg.sender].xvi) {
            ans_count[ans[0]] = ans_count[ans[0]] + rep*10000;
            verifier[msg.sender].ans = 0;
            return (ans[0]);
        }
        else if(keccak256(abi.encodePacked(ans_hash[1], ran_hash)) == verifier[msg.sender].xvi) {
            ans_count[ans[1]] = ans_count[ans[1]] + rep*10000;
            verifier[msg.sender].ans = 1;
            return (ans[1]);
        }
    }

    function show_ans() view public returns(uint) {
        require(block.timestamp >= task_time + 86400, "It isn't a time to show answer");
        if(ans_count[ans[0]] > ans_count[ans[1]])
            return ans[0];
        else 
            return ans[1];
    }

    function withdraw_reward(bytes32 proof_) public {
        require(block.timestamp >= task_time + 172800, "It isn't a time to withdraw reward");
        require(verifier[msg.sender].task_accept);
        require(address(bytes20(uint160(uint256(keccak256(verifier[msg.sender].pk))))) == msg.sender, "You couldn't use this certificate");
        require(proof_ == verifier[msg.sender].proof, "Your proof is not the same with the previous one.");
        payable(address(this)).transfer(reward/ans_count[verifier[msg.sender].ans]);
    }
    function setReward(uint256 x) public {
        reward = x;
    }
    fallback() external{}
} 