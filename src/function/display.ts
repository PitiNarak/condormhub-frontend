function pad(n: string) {
  return '0'.repeat(3 - n.length) + n;
}

export function displayPrice(price: number) {
  let result = '';
  while (price >= 1000) {
    result = pad(String(price % 1000)) + ',' + result;
    price /= 1000;
  }
  result = String(price % 1000) + ',' + result;
  return result.slice(0, result.length - 1);
}
