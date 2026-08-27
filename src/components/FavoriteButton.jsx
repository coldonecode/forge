import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useStore } from "../store/useStore";

export default function FavoriteButton({ type, id, size = 18 }) {
  const isFav = useStore((s) => s.isFavorite(type, id));
  const toggleFavorite = useStore((s) => s.toggleFavorite);

  return (
    <motion.button
      whileTap={{ scale: 1.25 }}
      animate={{ scale: isFav ? 1.1 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(type, id);
      }}
      className="cursor-pointer p-1 flex items-center justify-center"
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={size}
        className={
          isFav
            ? "fill-volt text-volt"
            : "fill-none text-faint"
        }
        strokeWidth={isFav ? 0 : 1.5}
      />
    </motion.button>
  );
}
