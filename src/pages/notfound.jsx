import { TriangleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { motion } from 'motion/react';

export default function NotFound404() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-inner shadow-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center p-8 bg-white dark:bg-neutral-900 shadow-2xl rounded-3xl max-w-md w-full border-2 border-blue-300 dark:border-blue-700 hover:scale-105 duration-200"
      >
        <TriangleAlertIcon className="w-20 h-20 text-pink-500 drop-shadow-lg" />
        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-white mt-6">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-3 text-center">
          Uh-oh! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300">
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
