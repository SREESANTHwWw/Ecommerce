import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Typography } from "../../AppForm/Form";

type Props ={
  rating? :number
}

const StarRating = ({ rating = 0 }:Props) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-500 text-sm">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}

      {hasHalfStar && <FaStarHalfAlt />}

      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}

      <Typography className="ml-1 text-gray-500 text-xs">
        ({rating.toFixed(1)})
      </Typography>
    </div>
  );
};

export default StarRating;
