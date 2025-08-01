import React, { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";

const initialEmployees = [
  {
    id: 1,
    empId: "EMP1749036241",
    salutation: "Mr.",
    firstName: "Virat",
    lastName: "Kohli",
    department: "Management",
    phoneCountryCode: "+27",
    phone: "877857968",
    email: "virat123@gmail.com",
    company: "Ben Tech",
    designation: "Manager",
    dob: "1988-11-05",
    gender: "Male",
    currentAddress: {
      flat: "101/A",
      street: "Rose Street",
      city: "Johannesburg",
      pincode: "2001",
      province: "Gauteng",
      country: "South Africa",
    },
    permanentAddress: {
      flat: "101/A",
      street: "Rose Street",
      city: "Johannesburg",
      pincode: "2001",
      province: "Gauteng",
      country: "South Africa",
    },
    emergencyContacts: [
      { name: "Anita Kohli", phoneCountryCode: "+27", phone: "812345678" },
    ],
    status: true,
  },
  {
    id: 2,
    empId: "EMP1750211792",
    salutation: "Ms.",
    firstName: "Santhosh",
    lastName: "Kumar",
    department: "Management",
    phoneCountryCode: "+91",
    phone: "8405486451",
    email: "santhosh1792@gmail.com",
    company: "Ben Tech",
    designation: "Developer",
    dob: "1990-06-15",
    gender: "Male",
    currentAddress: {
      flat: "10B",
      street: "Maple Street",
      city: "Mumbai",
      pincode: "400001",
      province: "Maharashtra",
      country: "India",
    },
    permanentAddress: {
      flat: "10B",
      street: "Maple Street",
      city: "Mumbai",
      pincode: "400001",
      province: "Maharashtra",
      country: "India",
    },
    emergencyContacts: [
      { name: "Ravi Kumar", phoneCountryCode: "+91", phone: "9876543210" },
    ],
    status: true,
  },
  // Add 6 more employee objects as needed
];

// Dropdown options
const countryCodes = ["+27", "+91", "+1", "+44"];
const companies = ["Ben Tech", "Zen Corp"];
const departments = ["Management", "Engineering", "Sales"];
const designations = ["Manager", "Developer", "HR", "Sales Executive"];
const provincesByCountry = {
  "South Africa": ["Gauteng", "KwaZulu-Natal", "Western Cape"],
  India: ["Maharashtra", "Karnataka", "Tamil Nadu"],
  USA: ["California", "Texas", "New York"],
  UK: ["England", "Scotland", "Wales"],
};
const genders = ["Male", "Female", "Other"];
const salutations = ["Mr.", "Ms.", "Mrs.", "Dr."];
const PAGE_SIZE_OPTIONS = [5, 8, 10];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const emptyEmployeeForm = {
    profileImage: null,
    empId: "EMP" + Math.floor(1000000000 + Math.random() * 9000000000),
    salutation: "",
    firstName: "",
    lastName: "",
    company: "",
    department: "",
    designation: "",
    phoneCountryCode: "+27",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    currentAddress: {
      flat: "",
      street: "",
      city: "",
      pincode: "",
      province: "",
      country: "",
    },
    permanentAddress: {
      flat: "",
      street: "",
      city: "",
      pincode: "",
      province: "",
      country: "",
    },
    emergencyContacts: [{ name: "", phoneCountryCode: "+27", phone: "" }],
    status: true,
  };

  const [form, setForm] = useState(emptyEmployeeForm);
  const [errors, setErrors] = useState({});

  // Edit existing employee
  const startEditEmployee = (empId) => {
    const emp = employees.find((e) => e.id === empId);
    if (!emp) return;
    setForm({ ...emp, profileImage: null });
    setEditingEmployeeId(empId);
    setIsAddingNew(false);
  };

  // Add new employee form
  const startAddEmployee = () => {
    setForm(emptyEmployeeForm);
    setEditingEmployeeId(null);
    setIsAddingNew(true);
  };

  // Filter employees by search
  const filteredEmployees = employees.filter((e) => {
    const search = searchTerm.toLowerCase();
    return (
      e.firstName.toLowerCase().includes(search) ||
      e.lastName.toLowerCase().includes(search) ||
      e.empId.toLowerCase().includes(search) ||
      e.email.toLowerCase().includes(search) ||
      e.department.toLowerCase().includes(search) ||
      e.company.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Validation helpers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{7,15}$/.test(phone);
  const validatePincode = (pincode) => /^\d{4,6}$/.test(pincode);
  const validateRequired = (val) => val && val.trim() !== "";

  const validateForm = () => {
    const newErrors = {};
    if (!validateRequired(form.firstName))
      newErrors.firstName = "First name is required";
    if (!validateRequired(form.lastName))
      newErrors.lastName = "Last name is required";
    if (!validateRequired(form.phone))
      newErrors.phone = "Phone number is required";
    else if (!validatePhone(form.phone))
      newErrors.phone = "Invalid phone number";
    if (!validateRequired(form.email))
      newErrors.email = "Email is required";
    else if (!validateEmail(form.email))
      newErrors.email = "Invalid email address";
    if (!validateRequired(form.currentAddress.country))
      newErrors["currentAddress.country"] = "Country is required";
    if (form.currentAddress.pincode && !validatePincode(form.currentAddress.pincode))
      newErrors["currentAddress.pincode"] = "Invalid pincode";
    if (!validateRequired(form.permanentAddress.country))
      newErrors["permanentAddress.country"] = "Country is required";
    if (form.permanentAddress.pincode && !validatePincode(form.permanentAddress.pincode))
      newErrors["permanentAddress.pincode"] = "Invalid pincode";

    form.emergencyContacts.forEach((c, idx) => {
      if (c.name.trim() !== "" || c.phone.trim() !== "") {
        if (!validateRequired(c.name)) newErrors[`emergencyContacts.${idx}.name`] = "Name required";
        if (!validatePhone(c.phone)) newErrors[`emergencyContacts.${idx}.phone`] = "Invalid phone";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const onInputChange = (e) => {
    let { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Emergency contact change
  const onEmergencyContactChange = (idx, field, value) => {
    const newContacts = [...form.emergencyContacts];
    newContacts[idx][field] = value;
    setForm((prev) => ({ ...prev, emergencyContacts: newContacts }));
  };

  // Add emergency contact row
  const addEmergencyContact = () => {
    setForm((prev) => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: "", phoneCountryCode: "+27", phone: "" }],
    }));
  };

  // Remove emergency contact row
  const removeEmergencyContact = (idx) => {
    setForm((prev) => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== idx),
    }));
  };

  // Copy current address to permanent
  const copyCurrentToPermanent = () => {
    setForm((prev) => ({
      ...prev,
      permanentAddress: { ...prev.currentAddress },
    }));
  };

  // Profile image upload
  const onProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be max 5MB");
      return;
    }
    setForm((prev) => ({ ...prev, profileImage: file }));
  };

  // Toggle employee active status
  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: !emp.status } : emp))
    );
  };

  // Delete employee
  const deleteEmployee = (id) => {
    if (!window.confirm("Are you sure to delete this employee?")) return;
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  // Handle form submit (add or update)
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isAddingNew) {
      setEmployees((prev) => [
        ...prev,
        {
          id: prev.length ? Math.max(...prev.map((e) => e.id)) + 1 : 1,
          ...form,
          profileImage: null,
        },
      ]);
      alert("Employee Added!");
    } else if (editingEmployeeId !== null) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployeeId ? { ...form, id: editingEmployeeId, profileImage: null } : emp
        )
      );
      alert("Employee Updated!");
    }
    setIsAddingNew(false);
    setEditingEmployeeId(null);
    setForm(emptyEmployeeForm);
    setErrors({});
  };

  // Cancel form
  const onCancel = () => {
    setIsAddingNew(false);
    setEditingEmployeeId(null);
    setForm(emptyEmployeeForm);
    setErrors({});
  };

  // --- RENDERING ---

  if (isAddingNew || editingEmployeeId !== null) {
    // Add/Edit Form
    return (
      <div className="max-w-full mx-auto px-10 bg-white rounded-lg shadow-md font-sans">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          {isAddingNew ? "Add Employee Profile" : "Edit Employee Profile"}
        </h2>
        <div className="bg-blue-100 text-blue-800 p-4 rounded mb-6 text-sm">
          Please fill out the form carefully with valid details.
        </div>
        <form onSubmit={onFormSubmit} noValidate>
          {/* Profile & ID & Salutation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                Profile Image
              </label>
              <input type="file" accept="image/*" onChange={onProfileImageChange} />
              {form.profileImage && (
                <img
                  src={URL.createObjectURL(form.profileImage)}
                  alt="Profile Preview"
                  className="w-16 h-16 object-cover rounded mt-2"
                />
              )}
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                Employee ID
              </label>
              <input
                type="text"
                value={form.empId}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed text-gray-700"
              />
              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Salutation
              </label>
              <select
                name="salutation"
                value={form.salutation}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              >
                <option value="">Select</option>
                {salutations.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Personal Details */}
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={onInputChange}
                className={`w-full p-2 border rounded text-gray-900 ${
                  errors.firstName ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}

              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Company
              </label>
              <select
                name="company"
                value={form.company}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              >
                <option value="">Select Company</option>
                {companies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Designation
              </label>
              <select
                name="designation"
                value={form.designation}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              >
                <option value="">Select Designation</option>
                {designations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <div className="flex space-x-2">
                <select
                  name="phoneCountryCode"
                  value={form.phoneCountryCode}
                  onChange={onInputChange}
                  className="p-2 border rounded w-24 text-gray-900"
                >
                  {countryCodes.map((cc) => (
                    <option key={cc} value={cc}>
                      {cc}
                    </option>
                  ))}
                </select>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onInputChange}
                  maxLength={15}
                  placeholder="Phone number"
                  className={`flex-grow p-2 border rounded text-gray-900 ${
                    errors.phone ? "border-red-600" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}

              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={onInputChange}
                className={`w-full p-2 border rounded text-gray-900 ${
                  errors.lastName ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
              )}

              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Department
              </label>
              <select
                name="department"
                value={form.department}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                name="email"
                value={form.email}
                onChange={onInputChange}
                placeholder="email@example.com"
                className={`w-full p-2 border rounded text-gray-900 ${
                  errors.email ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}

              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              >
                <option value="">Select</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address Section */}
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            Current Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                House/Flat No.
              </label>
              <input
                name="currentAddress.flat"
                value={form.currentAddress.flat}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              />
              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Area/Street/Village
              </label>
              <input
                name="currentAddress.street"
                value={form.currentAddress.street}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                Town/City
              </label>
              <input
                name="currentAddress.city"
                value={form.currentAddress.city}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              />
              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Pincode
              </label>
              <input
                name="currentAddress.pincode"
                value={form.currentAddress.pincode}
                onChange={onInputChange}
                maxLength={6}
                className={`w-full p-2 border rounded text-gray-900 ${
                  errors["currentAddress.pincode"] ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors["currentAddress.pincode"] && (
                <p className="text-red-600 text-sm mt-1">{errors["currentAddress.pincode"]}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                Province
              </label>
              <select
                name="currentAddress.province"
                value={form.currentAddress.province}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              >
                <option value="">Select Province</option>
                {(provincesByCountry[form.currentAddress.country] || []).map(
                  (p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  )
                )}
              </select>
              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Country <span className="text-red-600">*</span>
              </label>
              <select
                name="currentAddress.country"
                value={form.currentAddress.country}
                onChange={onInputChange}
                className={`w-full p-2 border rounded text-gray-900 ${
                  errors["currentAddress.country"] ? "border-red-600" : "border-gray-300"
                }`}
              >
                <option value="">Select Country</option>
                {Object.keys(provincesByCountry).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors["currentAddress.country"] && (
                <p className="text-red-600 text-sm mt-1">{errors["currentAddress.country"]}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={copyCurrentToPermanent}
            className="mt-4 mb-8 px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
            title="Copy Current Address to Permanent Address"
          >
            Copy Current Address to Permanent Address
          </button>

          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Permanent Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                House/Flat No.
              </label>
              <input
                name="permanentAddress.flat"
                value={form.permanentAddress.flat}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              />
              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Area/Street/Village
              </label>
              <input
                name="permanentAddress.street"
                value={form.permanentAddress.street}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                Town/City
              </label>
              <input
                name="permanentAddress.city"
                value={form.permanentAddress.city}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              />
              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Pincode
              </label>
              <input
                name="permanentAddress.pincode"
                value={form.permanentAddress.pincode}
                onChange={onInputChange}
                maxLength={6}
                className={`w-full p-2 border rounded text-gray-900 ${
                  errors["permanentAddress.pincode"] ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors["permanentAddress.pincode"] && (
                <p className="text-red-600 text-sm mt-1">{errors["permanentAddress.pincode"]}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                Province
              </label>
              <select
                name="permanentAddress.province"
                value={form.permanentAddress.province}
                onChange={onInputChange}
                className="w-full p-2 border rounded text-gray-900"
              >
                <option value="">Select Province</option>
                {(provincesByCountry[form.permanentAddress.country] || []).map(
                  (p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  )
                )}
              </select>
              <label className="block font-medium mt-4 mb-1 text-gray-900">
                Country <span className="text-red-600">*</span>
              </label>
              <select
                name="permanentAddress.country"
                value={form.permanentAddress.country}
                onChange={onInputChange}
                className={`w-full p-2 border rounded text-gray-900 ${
                  errors["permanentAddress.country"] ? "border-red-600" : "border-gray-300"
                }`}
              >
                <option value="">Select Country</option>
                {Object.keys(provincesByCountry).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors["permanentAddress.country"] && (
                <p className="text-red-600 text-sm mt-1">{errors["permanentAddress.country"]}</p>
              )}
            </div>
          </div>

          {/* Emergency Contacts */}
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            Emergency Contact(s)
          </h3>
          {form.emergencyContacts.map((c, idx) => (
            <div
              key={idx}
              className="flex gap-4 mb-4 items-end"
            >
              <div className="flex-1">
                <label className="block font-medium mb-1 text-gray-900">
                  Contact Person
                </label>
                <input
                  value={c.name}
                  onChange={(e) => onEmergencyContactChange(idx, "name", e.target.value)}
                  className={`w-full p-2 border rounded text-gray-900 ${
                    errors[`emergencyContacts.${idx}.name`]
                      ? "border-red-600"
                      : "border-gray-300"
                  }`}
                  placeholder="Name"
                />
                {errors[`emergencyContacts.${idx}.name`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`emergencyContacts.${idx}.name`]}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1 text-gray-900">
                  Phone
                </label>
                <div className="flex gap-2">
                  <select
                    value={c.phoneCountryCode}
                    onChange={(e) =>
                      onEmergencyContactChange(idx, "phoneCountryCode", e.target.value)
                    }
                    className="p-2 border rounded w-24 text-gray-900"
                  >
                    {countryCodes.map((cc) => (
                      <option key={cc} value={cc}>
                        {cc}
                      </option>
                    ))}
                  </select>
                  <input
                    value={c.phone}
                    onChange={(e) =>
                      onEmergencyContactChange(idx, "phone", e.target.value)
                    }
                    maxLength={15}
                    className={`flex-grow p-2 border rounded text-gray-900 ${
                      errors[`emergencyContacts.${idx}.phone`]
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                    placeholder="Phone number"
                  />
                </div>
                {errors[`emergencyContacts.${idx}.phone`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`emergencyContacts.${idx}.phone`]}
                  </p>
                )}
              </div>
              {form.emergencyContacts.length > 1 && (
                <button
                  type="button"
                  className="text-red-600 font-bold px-3 py-1 rounded hover:bg-red-100"
                  onClick={() => removeEmergencyContact(idx)}
                  aria-label="Remove Contact"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addEmergencyContact}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-semibold"
          >
            + Add Contact
          </button>

          {/* Footer Buttons */}
          <div className="mt-10 flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
            >
              {isAddingNew ? "Add Employee" : "Update Employee"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Employee List Page
  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md font-sans">
      {/* Header & Breadcrumb */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <nav className="text-gray-600 text-sm mb-1">
            <span>Dashboards</span> /{" "}
            <span className="font-semibold text-gray-900">Employee List</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Employee List</h1>
        </div>
        <button
          onClick={startAddEmployee}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition flex items-center gap-2"
          aria-label="Add Employee"
        >
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      {/* Controls: Entries per page and Search */}
      <div className="flex justify-between mb-4">
        <select
          value={entriesPerPage}
          onChange={(e) => {
            setEntriesPerPage(+e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 text-gray-900"
          aria-label="Entries per page"
        >
          {PAGE_SIZE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt} per page
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 w-64 text-gray-900"
          aria-label="Search employees"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "S.NO",
                "EMPLOYEE ID",
                "FIRST NAME",
                "DEPARTMENT",
                "PHONE",
                "EMAIL",
                "COMPANY",
                "STATUS",
                "ACTIONS",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider whitespace-nowrap"
                  scope="col"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
<tbody className="divide-y divide-gray-200">
  {paginatedEmployees.length > 0 ? (
    paginatedEmployees.map((emp, ix) => (
      <tr key={emp.id} className="hover:bg-gray-50">
        <td className="px-4 py-3 whitespace-nowrap text-gray-900">
          {(currentPage - 1) * entriesPerPage + ix + 1}
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-900">{emp.empId}</td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-900">
          {emp.salutation} {emp.firstName} {emp.lastName}
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-900">{emp.department}</td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-900">
          {emp.phoneCountryCode} {emp.phone}
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-900">{emp.email}</td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-900">{emp.company}</td>
        <td className="px-4 py-3 whitespace-nowrap flex items-center space-x-2 text-gray-900">
          <span className="text-green-600 font-semibold select-none">Active</span>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emp.status}
              onChange={() => toggleStatus(emp.id)}
              className="sr-only peer"
              aria-label={`Toggle status for ${emp.firstName} ${emp.lastName}`}
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-4 transition-transform"></div>
          </label>
        </td>
        <td className="px-4 py-3 whitespace-nowrap space-x-2 text-gray-900">
          <button
            onClick={() => startEditEmployee(emp.id)}
            aria-label="Edit"
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => deleteEmployee(emp.id)}
            aria-label="Delete"
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="9"
        className="text-center py-6 text-gray-800 select-none"
        role="cell"
      >
        No employees found.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 my-6" role="navigation" aria-label="Pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-3 py-1 rounded text-gray-700 ${
            currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-300"
          }`}
          aria-disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-300 text-gray-700"
            }`}
            aria-current={currentPage === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-3 py-1 rounded text-gray-700 ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-300"
          }`}
          aria-disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
