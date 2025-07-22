// Test percentage calculations for FinancialOverview component
const calculatePercentageChange = (currentValue, previousValue) => {
  if (!previousValue || previousValue === 0) {
    return currentValue > 0 ? '+100%' : '0%';
  }
  
  const change = ((currentValue - previousValue) / previousValue) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};

// Test cases
console.log('Test 1 - No previous data, current > 0:', calculatePercentageChange(100, 0)); // Should be +100%
console.log('Test 2 - No previous data, current = 0:', calculatePercentageChange(0, 0)); // Should be 0%
console.log('Test 3 - Increase:', calculatePercentageChange(150, 100)); // Should be +50.0%
console.log('Test 4 - Decrease:', calculatePercentageChange(50, 100)); // Should be -50.0%
console.log('Test 5 - No change:', calculatePercentageChange(100, 100)); // Should be +0.0%
console.log('Test 6 - Small increase:', calculatePercentageChange(105, 100)); // Should be +5.0%
console.log('Test 7 - Small decrease:', calculatePercentageChange(95, 100)); // Should be -5.0%

// Test with realistic data
const testData = {
  totalRevenue: 50000,
  previousRevenue: 40000,
  totalClients: 25,
  previousClients: 20,
  netProfit: 15000,
  previousProfit: 12000,
  overduePayments: 2,
  previousOverdue: 3
};

console.log('\nRealistic Test Cases:');
console.log('Revenue change:', calculatePercentageChange(testData.totalRevenue, testData.previousRevenue));
console.log('Clients change:', calculatePercentageChange(testData.totalClients, testData.previousClients));
console.log('Profit change:', calculatePercentageChange(testData.netProfit, testData.previousProfit));
console.log('Overdue change:', calculatePercentageChange(testData.overduePayments, testData.previousOverdue)); 