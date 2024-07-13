import sum from "../sum"

test("sum should work properly", () => {
    const result = sum(3,4);
    expect(result).toBe(7);
})