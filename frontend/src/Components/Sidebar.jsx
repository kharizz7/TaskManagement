import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Plus,
} from "lucide-react";

import { sidebarItems } from "../Data/sidebarData";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-violet-600 text-white p-3 rounded-xl shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Overlay */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed lg:sticky top-0 left-0 z-50
        bg-white border-r shadow-sm
        h-screen
        flex flex-col
        transition-all duration-300

        ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }

        ${collapsed ? "lg:w-20" : "lg:w-72"}

        w-72
      `}
      >
        {/* ================= Header ================= */}

        <div
          className={`h-20 border-b flex items-center
          ${
            collapsed
              ? "justify-center px-0"
              : "justify-between px-5"
          }`}
        >
          <div
            className={`flex items-center ${
              collapsed ? "" : "gap-3"
            }`}
          >
            <div className="w-11 h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold text-lg">
              T
            </div>

            {!collapsed && (
              <div>
                <h1 className="font-bold text-xl">
                  TaskBoard
                </h1>

                <p className="text-xs text-gray-500">
                  AI Workspace
                </p>
              </div>
            )}
          </div>

          {/* Desktop Toggle */}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          {/* Mobile Close */}

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= New Task ================= */}

        <div className="p-4">
          <NavLink
            to="/create-task"
            onClick={() => setMobileOpen(false)}
            className={`
            bg-violet-600
            hover:bg-violet-700
            text-white
            rounded-xl
            flex
            items-center
            justify-center
            transition

            ${
              collapsed
                ? "w-12 h-12 mx-auto"
                : "w-full py-3 gap-2"
            }
          `}
          >
            <Plus size={18} />

            {!collapsed && "New Task"}
          </NavLink>
        </div>

        {/* ================= Navigation ================= */}
{/* ================= Navigation ================= */}

<div className="flex-1 px-3 overflow-y-auto">
  {sidebarItems.map((item) => {
    const Icon = item.icon;

    // Disabled Items
    if (item.disabled) {
      return (
        <div
          key={item.title}
          className={`
            flex items-center
            rounded-xl
            py-3
            mb-2
            opacity-60
            cursor-not-allowed

            ${
              collapsed
                ? "justify-center px-0"
                : "justify-between px-4"
            }

            hover:bg-gray-50
          `}
        >
          <div
            className={`flex items-center ${
              collapsed ? "" : "gap-4"
            }`}
          >
            <Icon size={21} />

            {!collapsed && (
              <span>{item.title}</span>
            )}
          </div>

          {!collapsed && (
            <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
              Coming Soon
            </span>
          )}
        </div>
      );
    }

    // Active Items
    return (
      <NavLink
        key={item.title}
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={({ isActive }) =>
          `
          flex items-center
          rounded-xl
          py-3
          mb-2
          transition-all duration-200

          ${
            collapsed
              ? "justify-center px-0"
              : "gap-4 px-4"
          }

          ${
            isActive
              ? "bg-violet-100 text-violet-700 font-semibold shadow-sm"
              : "text-gray-600 hover:bg-gray-100 hover:text-violet-700"
          }
        `
        }
      >
        <Icon size={21} />

        {!collapsed && (
          <span>{item.title}</span>
        )}
      </NavLink>
    );
  })}
</div>
                {/* ================= Bottom ================= */}

        {!collapsed && (
          <div className="p-4 border-t">

            <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-5">

              <h3 className="font-semibold text-lg">
                AI Assistant
              </h3>

              <p className="text-sm opacity-90 mt-2">
                Describe your task naturally and let AI organize your work.
              </p>

              <NavLink
                to="/ai"
                onClick={() => setMobileOpen(false)}
                className="
                mt-5
                flex
                items-center
                justify-center
                bg-white
                text-violet-700
                rounded-xl
                py-3
                font-semibold
                hover:bg-gray-100
                transition
                "
              >
                Open AI
              </NavLink>

            </div>

          </div>
        )}

      </aside>
    </>
  );
}