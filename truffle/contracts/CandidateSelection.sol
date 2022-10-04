// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// contract CandidateSelection{
//     struct Candidate{
//         string name;
//         string logo; //A NFT will do beter i think.
//         uint NID;//He won't able to vote. Or will he?
//         string party;
//     }
//     bool public preVote; //For selecting the candidates.
//     mapping(address=>Candidate) candidates;
//     address[] public candidateAccts;

//     //Events
//     event CandidateAddEvent(address candidateAddress, string name, string logo, uint NID);

//     constructor(){
//         preVote = true;
//     }

//     function addCandidate(string calldata logo,  uint NID, string calldata party) public {
//         require(preVote, "The voting has already started.");
//         //checking if the NID is not empty.
//         require(NID >= 100000, "NIDs are 6 digits long.");
//         //Checking if the candidate is already added.
//         require(candidates[msg.sender].NID == 0, "The candidate is already added.");
//         //checking logo already exists or empty
//         require(bytes(logo).length > 0, "The logo is empty.");
        


        
//     }




// }