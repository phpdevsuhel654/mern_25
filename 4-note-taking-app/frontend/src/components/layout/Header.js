const Header = ({ toggleDark }) => {
  return (
    <div className="flex justify-between items-center p-4 shadow bg-white dark:bg-gray-800">
      <h1 className="text-xl font-bold">📝 Notes</h1>
      <button onClick={toggleDark}>🌙</button>
    </div>
  );
};

export default Header;