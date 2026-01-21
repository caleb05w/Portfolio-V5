'use client'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Template({ children }) {
    const pathname = usePathname()

    return (
        <motion.div
            key={pathname} // This triggers re-mount on route change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
            {children}
        </motion.div>
    )
}