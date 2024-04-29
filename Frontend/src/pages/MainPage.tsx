import Navbar from "../components/Navbar";

export function MainPage() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="absolute">
        <p>Hello, World!</p>
      </div>
    </div>
  );
}
