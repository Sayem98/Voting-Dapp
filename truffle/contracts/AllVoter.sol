// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AllVoter{
    struct Voter{
        uint id;
        string name;
        //Other info if needed;
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
        for(uint i; i<numberOfVoter; i++){
            if(voters[_voter].id != _id){
                revert('Voter already exist.');
            } 
        }
        //Checking if the NID is already registered
        if(voters[_voter].id == 0){
            voters[_voter] = Voter(_id, 'Voter');
            numberOfVoter++;
            emit NewVoterEvent(_voter, _id);
        }
        //Checking for the voter's address already connected with a voter
        require(voters[_voter].id == 0, 'Voter already exist.');

        Voter storage voter = voters[_voter];

        voter.id = _id;
        numberOfVoter = numberOfVoter + 1;

        emit NewVoterEvent(_voter, _id);

    }
        
    
    function Check(address _owner, uint _id) external view returns(bool isOwner){
        //Getting voter instance from the mapping
        Voter storage voter = voters[_owner];
        if(voter.id == _id){
            isOwner = true;
        }
    }
}