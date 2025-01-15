import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gita-soft dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gita-soft/50 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gita-primary dark:text-gita-light" />
          </button>
          <div className="flex items-center gap-2">
            <img src="download.png" alt="Krishna Logo" className="w-8 h-8" />
            <h1 className="text-lg font-semibold text-gita-primary dark:text-gita-light hidden sm:block">
              Gita Guide
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
};