import { motion } from "framer-motion";

export const Reveal = ({ children, className = "", delay = 0, style, ...rest }) => (
  <motion.div
    className={className}
    style={style}
    {...rest}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8%" }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export const SecHead = ({ eyebrow, title, copy, center = false }) => (
  <Reveal className={`sec-head ${center ? "center" : ""}`}>
    <p className="eyebrow teal">{eyebrow}</p>
    <h2>{title}</h2>
    {copy && <p className="sec-copy">{copy}</p>}
  </Reveal>
);
