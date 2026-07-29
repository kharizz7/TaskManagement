import {
  Search,
  ChevronDown
} from "lucide-react";

const user = JSON.parse(localStorage.getItem("user"));

export default function Navbar() {

  const name = user?.name || "Guest";
  const email = user?.email || "Software Engineer";

  return (
    <header className="bg-white border-b h-20 flex items-center justify-between pl-24 pr-6 lg:pl-10 lg:px-10">
      {/* Search */}

      <div className="w-[500px]">

        <div className="relative">

          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search tasks, projects or AI..."
            className="w-full bg-gray-100 rounded-2xl py-3 pl-14 pr-5 outline-none focus:ring-2 focus:ring-violet-500 transition"
          />

        </div>

      </div>

      {/* Profile */}

      <div className="ml-auto">
  <div className="flex items-center gap-3">

    {/* Avatar */}
    <div
      className="
      w-11
      h-11
      rounded-full
      bg-violet-600
      text-white
      flex
      items-center
      justify-center
      font-bold
      text-lg
      "
    >
      {name.charAt(0).toUpperCase()}
    </div>

    {/* Show only on md and above */}
    <div className="hidden md:block">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{email}</p>
    </div>

    {/* Dropdown only on md and above */}
    <ChevronDown
      size={18}
      className="hidden md:block"
    />

  </div>
</div>
     
    </header>
  );
}