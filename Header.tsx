import { Moon, Sun, Bell, MessageSquare, Menu } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Button } from "./ui/button";
import { useState } from "react";
import NotificationsPanel from "./NotificationsPanel";
import { useLocation, useNavigate } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";

export default function Header() {
  const { theme, toggleTheme, userRole, notifications } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleHomeClick = () => {
    if (userRole === "student") {
      navigate("/student");
    } else if (userRole === "tutor") {
      navigate("/tutor");
    } else {
      navigate("/admin");
    }
  };

  const userImage = "figma:asset/4a61db49c15cd921b9cb38a2013b8299f1b2f60c.png";

  const getRoleLabel = () => {
    if (userRole === "student") return "STUDENT";
    if (userRole === "tutor") return "TUTOR";
    return "ADMIN";
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar />
              </SheetContent>
            </Sheet>

            <button onClick={handleHomeClick} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-blue-500 text-lg hidden sm:inline">
                College Skill Exchange
              </span>
            </button>

            <span className="hidden md:inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded">
              {getRoleLabel()}
            </span>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hidden sm:flex"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>

            <button className="relative">
              <img
                src={userImage}
                alt="User"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>
          </div>
        </div>
      </header>

      <NotificationsPanel
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}
