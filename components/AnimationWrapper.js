"use client";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef, useEffect } from "react";
import PageTransition from "./PageTransition";

function FrozenRouter({ children }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function AnimationWrapper({ children }) {
  const pathname = usePathname();

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div style={{ position: 'relative', display: 'grid', width: '100%', maxWidth: '100vw' }}>
      <AnimatePresence initial={false}>
        <PageTransition key={pathname}>
          <FrozenRouter>{children}</FrozenRouter>
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
