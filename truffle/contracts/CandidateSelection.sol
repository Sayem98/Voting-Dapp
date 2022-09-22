// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './AllVoter.sol';
contract CandidateSelection{
    struct Candidate{
        string name;
        string logo; //A NFT will do beter i think.
        uint NID;//He won't able to vote. Or will he?

    }
    AllVoter Voter;

    mapping(address=> Candidate) public Cadidates;
    address[] public candidateAddress;
    uint public numberOfCandidates;
    address[] public voted_persons;
    mapping(address=> bool) public isVoted;
    mapping(address=>uint) public votes;

    event NewCandidateEvent(address indexed addr, uint NID, string name);
    event VoteEvent(address indexed candidate);

    constructor(address contractVoter){
        // startTime = _startTime;
        // endTime = _endtime;
        Voter = AllVoter(contractVoter);
    }

    function newCandidate(uint _NID, string memory _name, string memory _logo) external payable{
        require(msg.value>=1 ether, 'Value must be larger than 1 ether.');
        //If nft check it is owned by him.
        //Creating a candidate.
        Candidate storage candidate = Cadidates[msg.sender];
        candidate.logo = _logo;
        candidate.name = _name;
        candidate.NID = _NID;
        candidateAddress.push(msg.sender);
        
        emit NewCandidateEvent(msg.sender, _NID, _name);
    }

    function Vote(address candidate, uint NID) external{
        // require(block.timestamp>=startTime && block.timestamp<=endTime, 'Can not vote');
        require(isVoted[msg.sender] == false, 'Already voted');
        if(Voter.Check(NID, msg.sender) == false){
            revert('Not your ID');
        }

        uint count;
        for(uint i;i<numberOfCandidates;i++){
            if(candidate != candidateAddress[i]){
                count++;
            }
            else{
                break; //If equal then never count==numberOfCandidates gonna be true.
            }
        }

        if(count==numberOfCandidates){
            revert('Not known candidate !');
        }
        isVoted[msg.sender] = true;
        voted_persons.push(msg.sender);

        votes[candidate] = votes[candidate]+1;

        emit VoteEvent(candidate);

    }

    function getSelectedCandidates() external view returns(address c1, address c2, address c3){
        // finding 3 highest candidates.
        // If two Candidates have same vote?
        
    }


    



}