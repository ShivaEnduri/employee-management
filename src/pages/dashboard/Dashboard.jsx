import { useState, useMemo, useEffect } from "react";
import Header from "../../components/layout/Header";
import StatCard from "../../components/employee/StatCard";
import EmployeeTable from "../../components/employee/EmployeeTable";
import Modal from "../../components/common/Modal";
import EmployeeForm from "../../components/employee/EmployeeForm";
import { employees as initialEmployees } from "../../data/employees";
import { FiSearch, FiPlus, FiPrinter } from "react-icons/fi";
import { RiTeamLine, RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [status, setStatus] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees (simulate async API)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEmployees(initialEmployees);
      setLoading(false);
    }, 800);
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
      const matchesGender = gender === "all" || emp.gender === gender;
      const matchesStatus = status === "all" || emp.status === status;
      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, search, gender, status]);

  /* -------------------- HANDLERS -------------------- */
  const handleAdd = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 500)); // simulate API
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
  setLoading(true);
  await new Promise((r) => setTimeout(r, 500)); // simulate API delay

  if (editingEmployee) {
    // Edit existing employee
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === editingEmployee.id ? { ...data, id: editingEmployee.id } : e
      )
    );
  } else {
    // Add new employee with sequential EMP ID
    const lastId = employees.length
      ? Math.max(
          ...employees.map((e) => parseInt(e.id.replace("EMP", "")))
        )
      : 0;
    const newId = `EMP${String(lastId + 1).padStart(3, "0")}`;

    setEmployees((prev) => [...prev, { ...data, id: newId }]);
  }

  setIsModalOpen(false);
  setEditingEmployee(null);
  setLoading(false);
};


  const handlePrint = () => window.print();

  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header userEmail={userEmail} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-500 mt-1">Manage your team members efficiently</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Employees" value={employees.length} color="border-teal-500" icon={<RiTeamLine className="text-2xl text-teal-600" />} />
          <StatCard title="Active Employees" value={employees.filter((e) => e.status === "active").length} color="border-green-500" icon={<RiCheckboxCircleLine className="text-2xl text-green-600" />} />
          <StatCard title="Inactive Employees" value={employees.filter((e) => e.status === "inactive").length} color="border-orange-500" icon={<RiCloseCircleLine className="text-2xl text-orange-600" />} />
        </div>

        {/* Filters & Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
          <div className="space-y-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              {/* Search */}
              <div className="relative max-w-md w-full">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Filters & Buttons */}
              <div className="flex flex-wrap gap-3">
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 text-sm">
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 text-sm">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg">
                  <FiPlus /> Add Employee
                </button>

                <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg">
                  <FiPrinter /> Print
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <LoadingSpinner />
          ) : filteredEmployees.length === 0 ? (
            <p className="text-center py-10 text-gray-400">No employees found.</p>
          ) : (
            <EmployeeTable data={filteredEmployees} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <EmployeeForm initialData={editingEmployee} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Dashboard;
