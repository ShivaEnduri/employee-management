import { useState, useEffect } from "react";
import { validateEmployee } from "../../utils/validators";

const states = ["Telangana", "Andhra Pradesh", "Kerala", "Tamil Nadu"];

const EmployeeForm = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    status: "active",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  /* ---------- Populate data when editing ---------- */
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPreview(initialData.image || "");
    }
  }, [initialData]);

  /* ---------- Handle input change ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* ---------- Handle image upload ---------- */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateEmployee(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate API
    onSave(form);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-1"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-1"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </div>

      {/* DOB */}
      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-1"
        />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium">State</label>
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-1"
        >
          <option value="">Select</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-1"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Profile Image */}
      <div>
        <label className="block text-sm font-medium">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mt-1"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-24 h-24 rounded-full object-cover border"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
