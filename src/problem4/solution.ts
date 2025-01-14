function sum_to_n_a(n: number): number {
  if (!n) return 0;
  const signNum = n > 0 ? 1 : -1;
  return (n - 1) * (n / 2) * signNum;
}

function sum_to_n_b(n: number): number {
  let res = 0;
  for (let i = 0; i <= n; i++) res += i;
  return res;
}

function sum_to_n_c(n: number): number {
  if (n) return n + sum_to_n_c(n - 1);
  return 0;
}
