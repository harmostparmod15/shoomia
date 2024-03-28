const Error = ({
  setShowErroPage,
  appName,
}: {
  setShowErroPage: () => void;
  appName: string;
}) => {
  return (
    <div className=" absolute top-0 right-0 bg-slate-100 py-4 px-12 rounded-md border border-green-400  ">
      <div className="flex gap-4  items-baseline ">
        <svg
          onClick={setShowErroPage}
          className=" cursor-pointer"
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.50136"
            y1="14.5844"
            x2="15.0844"
            y2="1.00135"
            stroke="black"
            stroke-width="2"
          />
          <line
            x1="1.70711"
            y1="1.29289"
            x2="15.2902"
            y2="14.876"
            stroke="black"
            stroke-width="2"
          />
        </svg>
        <h1 className="">ERROR</h1>
      </div>

      <h1 className="underline text-red-400 ">{appName}</h1>
    </div>
  );
};

export default Error;
