// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AllVoter{
    struct Voter{
        uint id;
        //Other info if needed
    }

    address private immutable Owner;
    uint public numberOfVoter;

    mapping(address=>Voter) public voters;


    event NewVoterEvent(address indexed addr, uint indexed id);

    constructor(){
        Owner = msg.sender;
    }

    function addVoter(address _voter, uint _id) external {
        require(Owner == msg.sender, 'You are not allowed.');

        Voter storage voter = voters[_voter];

        voter.id = _id;
        numberOfVoter = numberOfVoter + 1;

        emit NewVoterEvent(_voter, _id);

    }

    function Check(uint _id, address _owner) external view returns(bool isOwnder){
        Voter storage voter = voters[_owner];
        if(voter.id == _id){
            isOwnder = true;
        }
    }

    

    
}