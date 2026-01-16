export default function UserProfile({ user, onLogout }) {
  return (
    <div className="bg-black border-t border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-black font-bold text-lg">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <div className="text-white font-semibold">{user.username}</div>
            <div className="text-gray-500 text-xs">Online</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="text-gray-400 hover:text-orange-500 transition-colors text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
