export function formatCurrency(amount, currency = 'INR', locale = 'en-IN') {
  if (typeof amount !== 'number') return amount;
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (e) {
     return `${currency} ${amount.toFixed(2)}`;
  }
}   
export async function convertAndFormatCurrency(
    amount,
    fromCurrency = 'USD',
    toCurrency = 'INR',
    locale = 'en-IN'
  ) {
    if (typeof amount !== 'number') return amount;
    if (fromCurrency === toCurrency) {
      return formatCurrency(amount, toCurrency, locale);
    }
    try {
       const res = await fetch(
        `https://api.exchangerate.host/convert?access_key=deba5e34186e1017d84206b3f103a3ec&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      const data = await res.json();
      if(data.success) {
      console.log(JSON.stringify(data));
       const toAmount = data.result || 1;
       return formatCurrency(toAmount, toCurrency, locale);
      } else {
        return `${toCurrency} ${amount.toFixed(2)}`;
      }
    } catch (e) {
       return `${toCurrency} ${amount.toFixed(2)}`;
    }
  }
  
