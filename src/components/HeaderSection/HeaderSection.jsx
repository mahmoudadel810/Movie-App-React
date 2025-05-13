import { motion } from "framer-motion";
import { Badge } from "react-bootstrap";
import style from "./HeaderSection.module.css";

export default function HeaderSection({ title, year, rating, genre }) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className={`${style.hColor} fw-bold`}>{title}</h1>
      <div className="d-flex gap-2 my-3">
        <Badge bg="danger">{year}</Badge>
        <Badge bg="dark">{rating}</Badge>
        {genre.split(", ").map((g, idx) => (
          <Badge key={idx} bg="dark">
            {g}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}
