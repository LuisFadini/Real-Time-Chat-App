import { toast, ToastContainer } from "react-toastify";

interface ICreateUserProps {
  setUser: (value: string) => any;
}

export function CreateUser(props: ICreateUserProps) {
  return (
    <div className="bg-zinc-800 absolute left-1/2 -translate-x-1/2 text-zinc-100 flex flex-col justify-center items-center rounded-lg lg:w-[30vw] md:w-[70vw] h-[50vh] w-[90vw] shadow-md">
      <h1 className="text-4xl mt-5">Create a user</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = (e.target as any).elements.name.value as string;
          if (name === "" || name === null) {
            toast.error("Please enter a name", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
            });
          } else {
            props.setUser(name);
          }
        }}
        className="flex flex-col justify-center items-center h-full w-full"
      >
        <input
          placeholder="Enter a name"
          type="text"
          name="name"
          className="placeholder-zinc-400 placeholder:text-center text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none text-center w-[calc(100%-2rem)] shadow-md"
        />
        <button
          type="submit"
          className="rounded-md bg-gradient-to-tr from-blue-600 to-blue-300 h-12 mt-6 text-xl w-[calc(100%-2rem)] shadow-md"
        >
          Create
        </button>
      </form>
    </div>
  );
}
