// Version 4.1
const pSBC = (percentage: number, fromColor: string, toColor?: string, shouldUseLinear?: boolean) => {
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    m = Math.round,
    a: any = typeof toColor == "string";
  if (
    typeof percentage != "number" ||
    percentage < -1 ||
    percentage > 1 ||
    typeof fromColor != "string" ||
    (fromColor[0] != "r" && fromColor[0] != "#") ||
    (toColor && !a)
  )
    return null;
  (h = fromColor.length > 9),
    (h = a ? (toColor !== undefined && toColor.length > 9 ? true : toColor == "c" ? !h : false) : h),
    (f = pSBC.pSBCr(fromColor)),
    (P = percentage < 0),
    (t =
      toColor && toColor != "c"
        ? pSBC.pSBCr(toColor)
        : P
        ? { r: 0, g: 0, b: 0, a: -1 }
        : { r: 255, g: 255, b: 255, a: -1 }),
    (percentage = P ? percentage * -1 : percentage),
    (P = 1 - percentage);
  if (!f || !t) return null;
  if (shouldUseLinear)
    (r = m(P * f.r + percentage * t.r)),
      (g = m(P * f.g + percentage * t.g)),
      (b = m(P * f.b + percentage * t.b));
  else
    (r = m((P * f.r ** 2 + percentage * t.r ** 2) ** 0.5)),
      (g = m((P * f.g ** 2 + percentage * t.g ** 2) ** 0.5)),
      (b = m((P * f.b ** 2 + percentage * t.b ** 2) ** 0.5));
  (a = f.a),
    (t = t.a),
    (f = a >= 0 || t >= 0),
    (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * percentage) : 0);
  if (h)
    return (
      "rgb" +
      (f ? "a(" : "(") +
      r +
      "," +
      g +
      "," +
      b +
      (f ? "," + m(a * 1000) / 1000 : "") +
      ")"
    );
  else
    return (
      "#" +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
};

pSBC.pSBCr = (d: any) => {
  const i = parseInt;
  let n = d.length,
    x: Record<string, number> = {};
  if (n > 9) {
    const [r, g, b, a] = (d = d.split(","));
    n = d.length;
    if (n < 3 || n > 4) return null;
    (x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4))),
      (x.g = i(g)),
      (x.b = i(b)),
      (x.a = a ? parseFloat(a) : -1);
  } else {
    if (n == 8 || n == 6 || n < 4) return null;
    if (n < 6)
      d =
        "#" +
        d[1] +
        d[1] +
        d[2] +
        d[2] +
        d[3] +
        d[3] +
        (n > 4 ? d[4] + d[4] : "");
    d = i(d.slice(1), 16);
    if (n == 9 || n == 5)
      (x.r = (d >> 24) & 255),
        (x.g = (d >> 16) & 255),
        (x.b = (d >> 8) & 255),
        (x.a = Math.round((d & 255) / 0.255) / 1000);
    else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
  }
  return x;
};

export default pSBC;
