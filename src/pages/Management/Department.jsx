import React, { useState, useMemo } from "react";
import { Edit, Trash2, Plus } from "lucide-react";

const initialDepartments = [
  { id: 1, name: "Operations", company: "Reliance", status: true },
  { id: 2, name: "Management", company: "Reliance", status: true },
  { id: 3, name: "HR", company: "Google", status: true },
  { id: 4, name: "Sales", company: "Microsoft", status: false },
];

const companies = ["Reliance", "Google", "Microsoft", "Amazon"];

export default function Department() {
  console.log("Department component is loading..."); // Debug log
  
  const [departments, setDepartments] = useState(initialDepartments);
  const [search, setSearch] = useState("");
  const [entriesPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Manage view mode: "list" | "add" | "edit"
  const [mode, setMode] = useState("list");
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formCompany, setFormCompany] = useState(companies[0]);

  // Filter and paginate departments by search query
  const filtered = useMemo(() => {
    return departments.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, departments]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const paginated = filtered.slice(
    (page - 1) * entriesPerPage,
    page * entriesPerPage
  );

  // Toggle active/inactive status for a department
  const toggleStatus = (id) => {
    setDepartments((deps) =>
      deps.map((d) => (d.id === id ? { ...d, status: !d.status } : d))
    );
  };

  // Delete department with confirmation
  const deleteDepartment = (id) => {
    if (window.confirm("Delete this department?")) {
      setDepartments((deps) => deps.filter((d) => d.id !== id));
      // Adjust page if current page is now empty after delete
      if ((page - 1) * entriesPerPage >= filtered.length - 1 && page > 1) {
        setPage(page - 1);
      }
    }
  };

  // Open add department form
  const openAddForm = () => {
    setFormName("");
    setFormCompany(companies[0]);
    setEditingId(null);
    setMode("add");
  };

  // Open edit department form with pre-filled data
  const openEditForm = (id) => {
    const dep = departments.find((d) => d.id === id);
    if (!dep) return;
    setFormName(dep.name);
    setFormCompany(dep.company);
    setEditingId(id);
    setMode("edit");
  };

  // Cancel form and return to list view
  const cancelForm = () => {
    setMode("list");
    setEditingId(null);
  };

  // On form submission, add or update department
  const submitForm = (e) => {
    e.preventDefault();

    if (!formName.trim()) {
      alert("Please enter a Department name.");
      return;
    }

    if (mode === "add") {
      const newId = departments.length
        ? Math.max(...departments.map((d) => d.id)) + 1
        : 1;
      setDepartments((deps) => [
        ...deps,
        { id: newId, name: formName.trim(), company: formCompany, status: true },
      ]);
    } else if (mode === "edit") {
      setDepartments((deps) =>
        deps.map((d) =>
          d.id === editingId ? { ...d, name: formName.trim(), company: formCompany } : d
        )
      );
    }

    setMode("list");
    setEditingId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 sm:px-8 py-8 ">
      {mode === "list" && (
        <>
          {/* Header/title and controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h1 className="font-bold text-gray-900 text-xs">Department List</h1>
            <div className="flex flex-row flex-wrap gap-3 md:gap-4 items-center">
              <input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="border border-gray-300 focus:ring-1 focus:ring-blue-500 rounded px-3 py-2 text-sm text-gray-900"
                style={{ minWidth: 180 }}
                aria-label="Search departments"
              />
              <button
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded shadow"
                onClick={openAddForm}
                aria-label="Add Department"
              >
                <Plus className="w-4 h-4 mr-1" />
                + Department
              </button>
            </div>
          </div>

          {/* Department table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg bg-white shadow-sm">
              <thead>
                <tr className="bg-blue-50 text-left text-gray-900">
                  <th className="py-2 px-3 font-medium text-sm">S.NO</th>
                  <th className="py-2 px-3 font-medium text-sm">DEPARTMENT NAME</th>
                  <th className="py-2 px-3 font-medium text-sm">COMPANY</th>
                  <th className="py-2 px-3 font-medium text-sm text-center">STATUS</th>
                  <th className="py-2 px-3 font-medium text-sm text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((dep, idx) => (
                    <tr
                      key={dep.id}
                      className="hover:bg-blue-50 transition-colors text-gray-900"
                    >
                      <td className="py-2 px-3">{(page - 1) * entriesPerPage + idx + 1}</td>
                      <td className="py-2 px-3">{dep.name}</td>
                      <td className="py-2 px-3">{dep.company}</td>
                      <td className="py-2 flex justify-center">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={dep.status}
                            onChange={() => toggleStatus(dep.id)}
                            className="sr-only peer"
                            aria-label={`Toggle status for ${dep.name}`}
                          />
                          <div className="w-14 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-colors relative">
                            <span
                              className={`absolute left-2 top-1 text-xs font-medium text-white select-none transition-opacity ${
                                dep.status ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              Active
                            </span>
                            <span
                              className={`absolute right-2 top-1 text-xs font-medium text-white select-none transition-opacity ${
                                dep.status ? "opacity-0" : "opacity-100"
                              }`}
                            >
                              Inactive
                            </span>
                          </div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-8 transition-transform"></div>
                        </label>
                      </td>
                      <td className="py-2 px-3 text-center space-x-2">
                        <button
                          className="p-1 rounded hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label={`Edit department ${dep.name}`}
                          onClick={() => openEditForm(dep.id)}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-red-100 text-red-600 hover:text-red-800 transition-colors"
                          aria-label={`Delete department ${dep.name}`}
                          onClick={() => deleteDepartment(dep.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between mt-4 gap-2">
            <span className="text-sm text-gray-800">
              Showing {(page - 1) * entriesPerPage + 1} to{" "}
              {Math.min(page * entriesPerPage, filtered.length)} of {filtered.length} entries
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-blue-600 disabled:bg-blue-300 text-white hover:bg-blue-700 transition-colors"
                aria-label="Previous page"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  } transition-colors`}
                  aria-label={`Page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded bg-blue-600 disabled:bg-blue-300 text-white hover:bg-blue-700 transition-colors"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {(mode === "add" || mode === "edit") && (
        <div className="max-w-md mx-auto w-full bg-white border border-gray-200 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {mode === "add" ? "Add Department" : "Edit Department"}
          </h2>
          <form onSubmit={submitForm} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="department"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter department name"
                autoFocus
                required
                aria-required="true"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company
              </label>
              <select
                id="company"
                value={formCompany}
                onChange={(e) => setFormCompany(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {companies.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={cancelForm}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                {mode === "add" ? "Add Department" : "Update Department"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
