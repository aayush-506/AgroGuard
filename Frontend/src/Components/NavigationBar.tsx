import ThemeToggle from "./ThemeToggle"

export default function NavigationBar() {
    return (
        <nav className="w-full bg-white-4 dark:bg-dark-2 p-2 flex">
            <img
                src="/icon-2000x2000.png"
                alt="logo-loading"
                className="w-[56px] h-[56px] ml-[12px] cursor-pointer"
            />
            <div className="h-full flex flex-col justify-center ml-[15px]">
                <h1 className="text-[21px] dark:text-white cursor-pointer">
                    Agro
                    <span className="font-[900] text-green-600 dark:text-newGreen-1">
                        Guard
                    </span>
                </h1>
                <p className="text-[14px] text-dark-3 dark:text-white-3 mt-[-5px] capitalize">
                    {/* Safeguarding crops, one leaf at a time! */}
                    Image-Based plant disease detection
                </p>
            </div>
            <div className="ml-[auto] flex justify-center items-center">
                <ThemeToggle rtype="switch" />
                {/* <button className="rounded-[9px] cursor-pointer self-center w-[134px] h-[40px] bg-green-600 dark:bg-newGreen-2 text-white text-[17px]">
                    View History
                </button> */}
            </div>
        </nav>
    )
}
