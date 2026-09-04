// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Base DeSci Proof Notebook
/// @notice Records a file fingerprint and Base block timestamp without storing the file.
contract BaseDeSciProofNotebook {
    uint256 public constant MAX_TITLE_BYTES = 120;

    struct Proof {
        address creator;
        uint64 timestamp;
        string title;
    }

    mapping(bytes32 => Proof) private proofs;
    mapping(address => bytes32[]) private proofHashesByCreator;

    event ProofAnchored(
        bytes32 indexed fileHash,
        address indexed creator,
        uint64 timestamp,
        string title
    );

    error EmptyHash();
    error EmptyTitle();
    error TitleTooLong();
    error ProofAlreadyExists();

    /// @notice Stores one irreversible timestamp for a SHA-256 file fingerprint.
    function anchorProof(bytes32 fileHash, string calldata title) external {
        if (fileHash == bytes32(0)) revert EmptyHash();
        if (bytes(title).length == 0) revert EmptyTitle();
        if (bytes(title).length > MAX_TITLE_BYTES) revert TitleTooLong();
        if (proofs[fileHash].timestamp != 0) revert ProofAlreadyExists();

        uint64 timestamp = uint64(block.timestamp);
        proofs[fileHash] = Proof({creator: msg.sender, timestamp: timestamp, title: title});
        proofHashesByCreator[msg.sender].push(fileHash);

        emit ProofAnchored(fileHash, msg.sender, timestamp, title);
    }

    function getProof(bytes32 fileHash) external view returns (Proof memory) {
        return proofs[fileHash];
    }

    function getProofHashesByCreator(address creator) external view returns (bytes32[] memory) {
        return proofHashesByCreator[creator];
    }
}
