const categorizeEvent = require("./categorizeEvent");

describe("categorizeEvent", () => {
  it("categorizes Work correctly", () => {
    expect(categorizeEvent("Project update", "Deadline tomorrow")).toBe("Work");
  });

  it("categorizes Personal correctly", () => {
    expect(categorizeEvent("Birthday party", "Family gathering")).toBe(
      "Personal"
    );
  });

  it("categorizes as Other if no match", () => {
    expect(categorizeEvent("Gym time", "Workout session")).toBe("Other");
  });
});
