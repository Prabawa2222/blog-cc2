export const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg w-[200px] h-[300px] flex flex-col items-center justify-center">
      <div className="bg-gray-300 rounded-full h-24 w-24 mb-6"></div>
      <div className="bg-gray-300 h-6 w-3/4 mb-4"></div>
      <div className="bg-gray-300 h-4 w-1/2"></div>
    </div>
  );
};

export const SkeletonPostsCard = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
      <div className="skeleton w-64 h-10 bg-gray-300 rounded animate-pulse mb-6"></div>
      <div className="skeleton w-full md:w-3/4 h-6 bg-gray-300 rounded animate-pulse"></div>
      <div className="skeleton w-32 h-4 bg-gray-300 rounded mt-4 animate-pulse"></div>
      <div className="skeleton w-full md:w-3/4 h-56 bg-gray-300 rounded-lg mt-6 animate-pulse"></div>
    </div>
  );
};

export const SkeletonAllPost = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <li key={index} className="text-xl text-gray-700 mb-4">
          <div className="flex items-center animate-pulse">
            <div className="w-32 h-32 mr-6 bg-gray-300 rounded-lg" />
            <div className="flex-1">
              <div className="h-6 bg-gray-300 mb-2 w-3/4 rounded" />
              <div className="h-4 bg-gray-300 mb-2 w-1/2 rounded" />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};
