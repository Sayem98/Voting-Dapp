// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './IVote.sol';
import './AllVoter.sol';

contract Voting is IVote{

    //Finally cadidates will come from candidate selection procces.
    address[] public candidates = [0x50b828c09B142f8B31d201155e54E545F5C6505D,0x0cf3bb1475b340Df0502ab4BbeFc33732dEB5bd1];
    uint public numberOfCandidates = 2;
    mapping(address=>uint) votes;

    address[] public voted_persons;
    mapping(address=> bool) public isVoted;

    uint public startTime;
    uint public endTime;
    AllVoter public Voter;

    
    


    event VoteEvent(address indexed candidate);

    constructor(address contractVoter){
        // startTime = _startTime;
        // endTime = _endtime;
        Voter = AllVoter(contractVoter);
    }




    function Vote(address candidate, uint NID) external{
        // require(block.timestamp>=startTime && block.timestamp<=endTime, 'Can not vote');
        require(isVoted[msg.sender] == false, 'Already voted');
        if(Voter.Check(NID, msg.sender) == false){
            revert('Not your ID');
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