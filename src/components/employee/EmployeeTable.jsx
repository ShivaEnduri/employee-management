import { FiEdit, FiTrash2 } from "react-icons/fi";

const EmployeeTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {[
              "ID",
              "Employee",
              "Date of Birth",
              "Gender",
              "State",
              "Status",
              "Actions",
            ].map((h) => (
              <th
                key={h}
                className="text-left py-4 px-4 text-sm font-semibold text-gray-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((emp) => (
            <tr
              key={emp.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-4 px-4 font-medium">{emp.id}</td>

              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{emp.name}</span>
                </div>
              </td>

              <td className="py-4 px-4 text-gray-600">{emp.dob}</td>
              <td className="py-4 px-4 capitalize">{emp.gender}</td>
              <td className="py-4 px-4">{emp.state}</td>

              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    emp.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {emp.status}
                </span>
              </td>

              <td className="py-4 px-4">
                <div className="flex justify-end space-x-2">
                  {/* ✅ EDIT */}
                  <button
                    onClick={() => onEdit(emp)}
                    className="w-8 h-8 text-teal-600 hover:bg-teal-50 rounded-lg flex items-center justify-center"
                    title="Edit"
                  >
                    <FiEdit />
                  </button>

                  {/* ✅ DELETE */}
                  <button
                    onClick={() => onDelete(emp.id)}
                    className="w-8 h-8 text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="text-center py-6 text-gray-400"
              >
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
