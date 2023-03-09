const {
  customerSuccessBalancing,
  filterCustomerSuccessAway,
  getCostumerSuccessWithCostumers,
  getCostumerSuccesWithMostClientsId,
} = require("./customer-success-balancing");

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    console.log(new Date().getTime() - testStartTime);
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

describe("filterCustomerSuccessAway()", () => {
  it("should return an empty array when customerSuccess and customerSuccessAway are empty", () => {
    const customerSuccess = [];
    const customerSuccessAway = [];

    const result = filterCustomerSuccessAway(
      customerSuccess,
      customerSuccessAway
    );

    expect(result).toEqual([]);
  });

  it("should return all elements of customerSuccess if customerSuccessAway is empty", () => {
    const customerSuccess = [
      {
        id: 1,
        name: "CSS 1",
      },
      {
        id: 2,
        name: "CSS 2",
      },
    ];
    const customerSuccessAway = [];

    const result = filterCustomerSuccessAway(
      customerSuccess,
      customerSuccessAway
    );

    expect(result).toEqual(customerSuccess);
  });

  it("should return only those elements of customerSuccess that are not in customerSuccessAway", () => {
    const customerSuccess = [
      {
        id: 1,
        name: "CSS 1",
      },
      {
        id: 2,
        name: "CSS 2",
      },
      {
        id: 3,
        name: "CSS 3",
      },
    ];
    const customerSuccessAway = [2, 3];

    const result = filterCustomerSuccessAway(
      customerSuccess,
      customerSuccessAway
    );

    expect(result).toEqual([
      {
        id: 1,
        name: "CSS 1",
      },
    ]);
  });

  it("should not modify the original customerSuccess array", () => {
    const customerSuccess = [
      {
        id: 1,
        name: "CSS 1",
      },
      {
        id: 2,
        name: "CSS 2",
      },
      {
        id: 3,
        name: "CSS 3",
      },
    ];
    const customerSuccessAway = [2, 3];

    filterCustomerSuccessAway(customerSuccess, customerSuccessAway);

    expect(customerSuccess).toEqual([
      {
        id: 1,
        name: "CSS 1",
      },
      {
        id: 2,
        name: "CSS 2",
      },
      {
        id: 3,
        name: "CSS 3",
      },
    ]);
  });
});

describe("getCostumerSuccesWithMostClientsId", () => {
  it("returns the id of the customer success with most customers", () => {
    const customerSuccessWithCustomers = [
      { id: 1, customersQuantity: 3 },
      { id: 2, customersQuantity: 5 },
      { id: 3, customersQuantity: 2 },
    ];
    const result = getCostumerSuccesWithMostClientsId(
      customerSuccessWithCustomers
    );
    expect(result).toEqual(2);
  });

  it("handles cases where multiple customer successes have the same amount of customers", () => {
    const customerSuccessWithCustomers = [
      { id: 1, customersQuantity: 3 },
      { id: 2, customersQuantity: 5 },
      { id: 3, customersQuantity: 2 },
      { id: 4, customersQuantity: 5 },
      { id: 5, customersQuantity: 1 },
    ];
    const result = getCostumerSuccesWithMostClientsId(
      customerSuccessWithCustomers
    );
    expect(result).toBe(0);
  });
});

describe("getCostumerSuccessWithCostumers", () => {
  const customerSuccess = [
    { id: 1, score: 10 },
    { id: 2, score: 20 },
    { id: 3, score: 30 },
  ];
  const customers = [
    { id: 1, score: 5 },
    { id: 2, score: 20 },
    { id: 3, score: 25 },
    { id: 4, score: 35 },
  ];

  it("should return correct customersQuantity for each customerSuccess object", () => {
    const result = getCostumerSuccessWithCostumers(customerSuccess, customers);

    expect(result[0].customersQuantity).toBe(1);
    expect(result[1].customersQuantity).toBe(1);
    expect(result[2].customersQuantity).toBe(1);
  });
});
