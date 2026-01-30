

const TextLoadingRound = ({ text = "LOADING..." }) => {
  return (
    <div className="w-40 overflow-hidden whitespace-nowrap">
      <p className="inline-block animate-text-flow font-Share text-2xl  opacity-70 tracking-widest font-semibold">
        {text}
      </p>
    </div>
  );
};

export default TextLoadingRound;
