import agro from "../assets/agro.png";
export default function Navbar() {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={agro}
            className="h-10"
            alt="AgroGuard Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            AgroGuard
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
}
