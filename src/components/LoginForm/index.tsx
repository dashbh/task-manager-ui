import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  error: string;
  isLoading: boolean;
}

export default function LoginForm({
  onSubmit,
  error,
  isLoading,
}: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(username, password);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold tracking-tight text-primary">
          Sign in to your account
        </h2>

        {error && (
          <div className="mt-6 rounded bg-red-100 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-2">Demo credentials:</p>
          <div className="space-y-1 text-xs text-gray-400">
            <p>
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                admin
              </span>
              {' / '}
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                admin123
              </span>
            </p>
            <p>
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                demo
              </span>
              {' / '}
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                demo123
              </span>
            </p>
            <p>
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                user
              </span>
              {' / '}
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                password
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
