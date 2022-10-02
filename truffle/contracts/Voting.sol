// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './AllVoter.sol';

contract Voting is AllVoter{
    address private admin;

    //Finally cadidates will come from candidate selection procces.
    address[] public candidates = [0x50b828c09B142f8B31d201155e54E545F5C6505D,0x0cf3bb1475b340Df0502ab4BbeFc33732dEB5bd1, 0xc1AE8c374fd410E960b69DC80309c4bcB1736560, 0x3605D2b4C63071e1bd5E39896d887A48C92C7E09];
    uint public numberOfCandidates = 4;
    mapping(address=>uint) votes;

    address[] public voted_persons;
    mapping(address=> bool) public isVoted;

    bool public isVotingStarted = false;
    uint public endTime;
    

    
    


    event VoteEvent(address indexed candidate);
    event VotingStartedEvent(uint indexed endTime);

    constructor(){
        admin = msg.sender;
        
    }

    function startVoting() external {
        require(msg.sender == admin, "Only admin can start voting");
        isVotingStarted = true;
        endTime = block.timestamp + 30 minutes;
        emit VotingStartedEvent(endTime);
    }



    function Vote(address candidate, string memory NID) external{
        require(isVotingStarted == true, 'Voting is not started');
        require(block.timestamp<=endTime, 'Can not vote');
        require(isVoted[msg.sender] == false, 'Already voted');
        require(endTime >= block.timestamp, 'Voting is over');

        Voter storage voter = voters[msg.sender];
        if(keccak256(abi.encodePacked(voter.id))  == keccak256(abi.encodePacked(NID)) == false){
            revert('You are not a voter');
        }
        uint count;
        for(uint i;i<numberOfCandidates;i++){
             if(candidate != candidates[i]){
                 count++;
            }
        }

        if(count==4){
            revert('Not known candidate !');
        }
        isVoted[msg.sender] = true;
        voted_persons.push(msg.sender);

        votes[candidate] = votes[candidate]+1;

        emit VoteEvent(candidate);

    }

    function VotesToCandidate(address _candidate) external view returns(uint){
        return votes[_candidate];
    }

    function Winner() external view returns(address winner){
        // require(block.timestamp>=endTime, 'Voting not finished yet.');
        uint highest_vote;
        
        for(uint i; i<numberOfCandidates;i++){
            
            if(votes[candidates[i]]>highest_vote){
                highest_vote = votes[candidates[i]];
                winner = candidates[i];
            }
        }
    }



}