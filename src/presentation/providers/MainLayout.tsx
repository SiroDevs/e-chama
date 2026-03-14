"use client";

import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "@/application/state/store";
import { setIsSidebarOpen } from "@/application/state/navSlice";
import MainNavBar from "../components/common/main-navbar";
import MainFooter from "../components/common/main-footer";
import Sidebar from "../components/common/sidebar";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 }
};

const contentVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

export function MainLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  
  const { groups } = useSelector((state: RootState) => state.group);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const isSidebarOpen = useSelector((state: RootState) => state.nav.isSidebarOpen);

  const handleSidebarClose = useCallback(() => {
    dispatch(setIsSidebarOpen(false));
  }, [dispatch]);

  const handleOverlayClick = useCallback(() => {
    if (isSidebarOpen) {
      handleSidebarClose();
    }
  }, [isSidebarOpen, handleSidebarClose]);

  const hasGroups = useMemo(() => groups && groups.length > 0, [groups]);

  const renderPublicLayout = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <MainNavBar />
      <main className="flex-grow">{children}</main>
      <MainFooter />
    </motion.div>
  );

  const renderAuthenticatedLayout = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      transition={{ duration: 0.5 }}
      className={`${isSidebarOpen ? "overflow-hidden md:overflow-visible" : ""} h-screen flex flex-col`}
    >
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="overlay"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black/60 md:hidden z-20"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="mobile-sidebar"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
            className="fixed md:hidden z-30 top-0 left-0 h-full"
          >
            <Sidebar onClose={handleSidebarClose} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-[240px_1fr] flex-grow w-full overflow-hidden">
        <aside className="hidden md:block h-full overflow-y-auto border-r border-gray-200">
          <Sidebar />
        </aside>

        <main className="w-full overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </motion.div>
  );

  if (!isAuthenticated || !hasGroups) {
    return renderPublicLayout();
  }

  return renderAuthenticatedLayout();
}