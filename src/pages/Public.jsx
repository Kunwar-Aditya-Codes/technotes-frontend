import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div
      className='min-h-screen bg-[url("https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1079&q=80")] 
    bg-no-repeat bg-cover bg-black/90 bg-fixed bg-center bg-blend-color text-white '
    >
      <div className="flex flex-col items-center justify-around p-2 max-w-6xl mx-auto h-screen">
        <h1 className="text-3xl text-center md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-wider">
          Repair Shop
        </h1>
        <p className="text-justify md:text-lg lg:text-xl md:font-light md:tracking-widest px-4">
          <span className="text-fuchsia-500 font-bold text-xl">
            Repair Shop
          </span>{" "}
          is to provide high quality, convenient and comprehensive{" "}
          <span className="underline underline-offset-4 decoration-fuchsia-500">
            auto repair at low cost.
          </span>{" "}
          The most important aspect of our business is trust. It is the goal of
          our firm to have{" "}
          <span className="underline underline-offset-4 decoration-fuchsia-500">
            100% customer satisfaction
          </span>{" "}
          in regards to quality, friendliness, time to completion and to
          discover new ways to exceed the expectations of our clients.
        </p>
        <button className="bg-blue-500/30 hover:bg-blue-500/80 transition ease-in-out px-4 py-2 rounded-sm text-lg">
          <Link to="/login">Employee Login</Link>
        </button>
      </div>
    </div>
  );
};
export default Public;
