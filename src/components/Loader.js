import { Spinner } from "@material-tailwind/react";

export default function Loader() {
  return (
    <div className="w-screen mt-52">
      <Spinner className="h-16 w-16 mx-auto text-gray-800/50" />
    </div>
  );
}
