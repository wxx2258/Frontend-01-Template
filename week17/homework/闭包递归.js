((g) => ((f) => f(f))((self) => g((...args) => self(self).apply(args))))(
  (self) => {
    return (n) => (n > 1 ? self(n - 1) + n : 0);
  }
);
