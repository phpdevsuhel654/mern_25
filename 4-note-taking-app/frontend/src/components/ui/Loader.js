const Loader = () => {
  return (
    <div className="animate-pulse space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
      ))}
    </div>
  );
};

export default Loader;