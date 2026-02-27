/* ── INR formatter: always uses the real ₹ glyph from a system font ── */
const INR = ({ amount }) => (
  <span style={{ fontFamily:"system-ui,'Segoe UI',sans-serif", fontWeight:900, fontSize:"inherit", color:"inherit" }}>
    &#8377;{amount}
  </span>
);

export default INR;
