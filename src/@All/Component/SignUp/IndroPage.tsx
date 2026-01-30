
import { useNavigate } from "react-router-dom";

const IntroPage = ({
  src = "https://res.cloudinary.com/dkz8fh4jt/video/upload/v1765042422/Video_Generation_From_Images-vmake_tbaogf.mp4",
  poster = "/poster.jpg",
}: any) => {

  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate("/"); 
  };

  return (
    <div className="bg-white">
      <video
        src={src}
        poster={poster}
        className="w-full h-screen object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}   
      />
    </div>
  );
};

export default IntroPage;
