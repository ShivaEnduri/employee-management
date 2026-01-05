const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="w-14 h-14 bg-opacity-20 rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
