// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

function addressToEntity(address a) pure returns (bytes32) {
  return bytes32(uint256(uint160((a))));
}

function genRanNumber(int x, int y, address addr) view returns (uint256) {
  uint nonce = uint(x + y);
  return uint(keccak256(abi.encodePacked(block.timestamp, addr, nonce)));
}

function max(int32 a, int32 b) pure returns (int32) {
  return a >= b ? a : b;
}

function abs(int32 x) pure returns (int32) {
  return x >= 0 ? x : -x;
}