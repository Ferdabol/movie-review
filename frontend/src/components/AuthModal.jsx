import { useState } from 'react';

export default function AuthModal({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Dummy accounts
  const dummyAccounts = [
    { username: 'alice', password: 'pass123' },
    { username: 'bob', password: 'pass123' },
    { username: 'charlie', password: 'pass123' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  const handleQuickLogin = (account) => {
    setUsername(account.username);
    setPassword(account.password);
    onLogin(account.username);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {/* Quick Login Buttons */}
        {isLogin && (
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3 text-center">Quick Login:</p>
            <div className="flex gap-2">
              {dummyAccounts.map((account) => (
                <button
                  key={account.username}
                  type="button"
                  onClick={() => handleQuickLogin(account)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium"
                >
                  {account.username}
                </button>
              ))}
            </div>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-500">or</span>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-800"
              placeholder="Enter your username"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-800"
                placeholder="Enter your email"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-800"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 hover:text-orange-400 text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
