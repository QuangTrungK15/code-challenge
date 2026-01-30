var sum_to_n_a = function (n) {
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
};

var sum_to_n_b = function (n) {
  if (n === 0 || n === 1) return n;
  let result = sum_to_n_b(n - 1) + n;
  return result;
};

var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(10));
console.log(sum_to_n_c(10));
