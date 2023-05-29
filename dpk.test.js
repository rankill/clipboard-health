const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");
const getHashFromInput = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a proper hash if the candidate is longer than MAX_PARTITION_KEY_LENGTH when a partitionKey is passed with wrong hash length", () => {
    const event = {
      partitionKey: "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862"
    };
    const expectedHash = getHashFromInput(event.partitionKey);
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(expectedHash);
  });

  it("Returns the partition key value of the event when given as a parameter", () => {
    const event = {
      partitionKey: "1"
    };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("1");
  });

  it("Returns the partition key value of the event as string when given as a numeric parameter", () => {
    const event = {
      partitionKey: 1
    };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("1");
  });

  it("Returns a hash based on the event data when given as a parameter without a partitionKey field", () => {
    const event = {};

    const data = JSON.stringify(event);
    const expectedHash = getHashFromInput(data);

    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(expectedHash);
  });

  it("Returns proper hash if candidate is null or undefined", () => {
    const trivialKeyNull = deterministicPartitionKey(null);
    expect(trivialKeyNull).toBe('0');

    const trivialKeyUndefined = deterministicPartitionKey(undefined);
    expect(trivialKeyUndefined).toBe('0');
  });

  it("Returns stringified candidate if input event is not an object", () => {
    const expectedHash =getHashFromInput("1");
    const trivialKey = deterministicPartitionKey(1);
    expect(trivialKey).toBe(expectedHash);
  });
});
