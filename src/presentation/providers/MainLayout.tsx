"use client";

import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import MainNavBar from "../components/common/main-navbar";
import MainFooter from "../components/common/main-footer";
import { RootState, useAppSelector } from "@/application/state/store";
import { setIsSidebarOpen } from "@/application/state/navSlice";
import Sidebar from "../components/common/sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const isSidebarOpen = useAppSelector((state) => state.nav.isSidebarOpen);
  const dispatch = useDispatch();

  const handleSidebarClose = () => {
    dispatch(setIsSidebarOpen(false));
  };

  if (!isAuthenticated) {
    return (
      <div>
        <MainNavBar />
        {children}
        <MainFooter />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${isSidebarOpen ? "overflow-hidden" : ""} h-screen`}
    >
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSidebarClose}
            className="bg-black/60 absolute top-0 left-0 md:hidden w-full h-screen z-20"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
            className="absolute md:hidden z-30 top-0 left-0"
          >
            <Sidebar onClose={handleSidebarClose} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-[240px_1fr] w-screen overflow-x-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="w-full overflow-x-auto max-w-[1440px] mx-auto">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
