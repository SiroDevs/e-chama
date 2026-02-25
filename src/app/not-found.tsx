import Link from 'next/link';
import ErrorLayout from './error-layout';

export default function NotFound() {
  return (
    <ErrorLayout>
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </ErrorLayout>
  );
}