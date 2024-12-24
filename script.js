function idBestUsers() {
  let monthlyOrders = [...arguments];
  let totalMonths = monthlyOrders.length;
  let clientOrders = new Object();

  monthlyOrders[0].forEach((clientId) => {
    if (!clientOrders[clientId]) {
      clientOrders[clientId] = new Array(monthlyOrders.length);
      clientOrders[clientId][0] = 0;
    }
    clientOrders[clientId][0]++;
  });

  var month;
  for (month = 1; month < totalMonths; month++) {
    monthlyOrders[month].forEach((clientId) => {
      if (clientOrders[clientId]) {
        if (!clientOrders[clientId][month]) {
          clientOrders[clientId][month] = 0;
        }
        clientOrders[clientId][month]++;
      }
    });
  }

  for (var clientId in clientOrders) {
    var totalOrdersForClient = 0;
    var everyMonth = true;
    var orders = clientOrders[clientId];

    for (var month = 0; month < totalMonths; month++) {
      if (!orders[month]) {
        everyMonth = false;
        break;
      }
      totalOrdersForClient += orders[month];
    }

    if (everyMonth) {
      clientOrders[clientId] = totalOrdersForClient;
    } else {
      delete clientOrders[clientId];
    }
  }

  var clientsByOrderTotal = new Object();

  Object.keys(clientOrders).forEach((clientId) => {
    var clientTotal = clientOrders[clientId];
    if (!clientsByOrderTotal[clientTotal]) {
      clientsByOrderTotal[clientTotal] = [clientId];
    } else {
      clientsByOrderTotal[clientTotal].push(clientId);
    }
  });

  var clientsByOrderTotalArray = Object.keys(clientsByOrderTotal).map(
    (total) => [parseInt(total), clientsByOrderTotal[total]]
  );

  clientsByOrderTotalArray.forEach((a) => a[1].sort());

  return clientsByOrderTotalArray.sort((a, b) => b[0] - a[0]);
}
