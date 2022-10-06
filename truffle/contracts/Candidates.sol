// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './AllVoter.sol';
contract Candidates{
    /* 
    there gonna be a pre-vote and a final vote.
    So, the pre-vote for candidate selections and the final vote for the actual election.
    In pre-vote, anyone can be a candidate with a valid NID and a ammount of money.
    In final vote, only the winner 3 candidate can be the real candidates for the final  vote.

    */ 

    
    
    // We need a struct to store the candidate details
    struct Candidate{
        string id;
        string name;
        string logo;
    }

    // We need a mapping to store the candidates
    mapping(address => Candidate) public candidates;
    address[] public candidateList;

    // We need a variable to store the candidates count
    uint public candidatesCount;

    //events
    event candidateAdded(address indexed candidateAddress, string indexed NID, string name, string logo);
    constructor(){

    }

    // We need a function to add a candidate
    function addCandidate(string memory _NID, string memory _name, string memory _logo) public payable{
        //Check if the candidate is already added?
        require(keccak256(abi.encodePacked(candidates[msg.sender].id))  == keccak256(abi.encodePacked("")), "Candidate already added");


        //Check the ammount of money is valid?
        require(msg.value == 1 ether, "You need to pay 1 ether to be a candidate");



        //Add the candidate
        candidatesCount++;
        candidates[msg.sender] = Candidate(_NID, _name, _logo);
        candidateList.push(msg.sender);

        emit candidateAdded(msg.sender, _NID, _name, _logo);
    }


    

}