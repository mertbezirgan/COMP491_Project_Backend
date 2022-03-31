enum size {
  XXS = "XXS",
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",
}

enum orderStatus {
  pending = 1,
  preparing = 2,
  shipping = 3,
  delivered = 4,
  cancelled = 5,
}

export { size, orderStatus };
