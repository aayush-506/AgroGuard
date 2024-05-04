// provides two right hand side section for disease name and treatment method

export function Info(
  { disease, prevention }: { disease: string; prevention: string },
) {
  return (
    <div className="w-1/2 p-4 border-gray-400 flex flex-col justify-center item-center">
      <div className="font-semibold p-4 flex w-full h-full justify-center items-center border-b border-gray-400">
        {disease}
      </div>
      <div className="font-semibold p-4 w-full flex justify-center items-center">
        {prevention}
      </div>
    </div>
  );
}
