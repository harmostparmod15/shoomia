const Error = ({
  setShowErroPage,
  appName,
}: {
  setShowErroPage: () => void;
  appName: string;
}) => {
  return (
    <div className=" absolute top-0 right-0 bg-slate-100 py-4 px-12 rounded-md border border-green-400  ">
      <div className="flex gap-4 ">
        <h1 onClick={setShowErroPage} className="text  cursor-pointer">
          ❌
        </h1>
        <h1 className="">ERROR</h1>
      </div>

      <h1>{appName}</h1>
    </div>
  );
};

export default Error;
