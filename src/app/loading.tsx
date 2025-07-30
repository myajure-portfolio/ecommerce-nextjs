import { Loader } from "@/components";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="mb-4 text-lg font-semibold">Loading</span>
      <Loader variant="dots" size="xl" />
    </div>
  );
};

export default LoadingPage;
