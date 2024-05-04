import { FileSubmit } from "../components/FileSubmit";
import { Info } from "../components/Info";
import Navbar from "../components/Navbar";

export function MainPage() {
  return (
    <div>
      <Navbar />
      <div className="mt-20 h-screen w-screen">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <FileSubmit />
          <Info
            disease="Disease Name"
            prevention="Treatment"
          />
        </div>
      </div>
    </div>
  );
}
