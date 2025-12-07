const Loader = ({ type = "spinner" }) => {
  if (type === "button")
    return (
      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    );

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
