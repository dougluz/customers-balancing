/**
 * Filter the customerSuccess array to remove the customerSuccess that are away
 * @param {array} customerSuccess
 * @param {array} customerSuccessAway
 */
function filterCustomerSuccessAway(customerSuccess, customerSuccessAway) {
  return customerSuccess.filter((css) => !customerSuccessAway.includes(css.id));
}

/**
 * Get the id of the CustomerSuccess with the most customers or 0 if there is more than one
 * @param {array} customerSuccessWithCustomers
 */
function getCostumerSuccesWithMostClientsId(customerSuccessWithCustomers) {
  let customerSuccessWithMostCustomers = null;
  let customerSuccesWithoutCustomers = 0;

  for (const customerSuccess of customerSuccessWithCustomers) {
    const hasMoreCostumers =
      customerSuccess.customersQuantity > customerSuccessWithMostCustomers?.customersQuantity;

    if (customerSuccess.customersQuantity === 0) {
      customerSuccesWithoutCustomers++;
      continue;
    }
    if (!customerSuccessWithMostCustomers || hasMoreCostumers) {
      customerSuccessWithMostCustomers = customerSuccess;
    } else if (
      customerSuccess.customersQuantity ===
      customerSuccessWithMostCustomers.customersQuantity
    ) {
      return 0;
    }
  }

  if (customerSuccessWithMostCustomers) {
    return customerSuccessWithMostCustomers.id;
  } else if (customerSuccesWithoutCustomers > 1) {
    return 0;
  }
}

function getCostumerSuccessWithCostumers(customerSuccess, customers) {
  return customerSuccess.map((cs) => {
    let customersQuantity = 0;

    for (let i = customers.length - 1; i >= 0; i--) {
      if (customers[i].score <= cs.score) {
        customersQuantity++;
        customers.splice(i, 1);
      }
    }

    return {
      ...cs,
      customersQuantity,
    };
  });
}

/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  const orderedCustomerSuccess = customerSuccess.sort(
    (a, b) => a.score - b.score
  );
  const orderedCustomers = customers.sort((a, b) => b.score - a.score);
  const availableCustomerSuccess = filterCustomerSuccessAway(
    orderedCustomerSuccess,
    customerSuccessAway
  );

  const customerSuccessWithCustomers = getCostumerSuccessWithCostumers(
    availableCustomerSuccess,
    orderedCustomers
  );

  const customerSuccessWithMostCustomersId = getCostumerSuccesWithMostClientsId(
    customerSuccessWithCustomers
  );

  return customerSuccessWithMostCustomersId;
}

module.exports = {
  customerSuccessBalancing,
  filterCustomerSuccessAway,
  getCostumerSuccesWithMostClientsId,
  getCostumerSuccessWithCostumers,
};
