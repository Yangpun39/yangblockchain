const MINE_RATE = 3000; // 3 seconds target time
const INITIAL_DIFFUCULTY = 7;

const genisis_data = {
    timestamp: 1,
    prev_hash: "0x000",
    hash: "0x123",
    difficulty: INITIAL_DIFFUCULTY,
    nonce: 0,
    data: [],
};

module.exports = { genisis_data, MINE_RATE };