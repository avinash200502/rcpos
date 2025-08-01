import React, { useState, useMemo } from "react";
import { Edit, Trash2, Plus } from "lucide-react";

const initialData = [
  { id: 1, company: "Reliance", department: "Operations", designation: "Waiter", status: true },
  { id: 2, company: "Reliance", department: "Management", designation: "Cashier", status: true },
  { id: 3, company: "Reliance", department: "Management", designation: "Manager", status: true },
  { id: 4, company: "Reliance", department: "Kitchen", designation: "Chef", status: true },
  { id: 5, company: "Reliance", department: "Management", designation: "Cashier", status: true },
];

const companies = ["Reliance", "Google", "Microsoft", "Amazon"];
const departments = ["Operations", "Management", "Kitchen", "HR", "Sales"];
const perPageOptions = [5, 10, 20, 50];

export default function Designation() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Manage view mode: "list" | "add" | "edit"
  const [mode, setMode] = useState("list");
  // For editing a designation, store the selected id
  const [editingId, setEditingId] = useState(null);

  // Form state variables
  const [formDesignation, setFormDesignation] = useState("");
  const [formCompany, setFormCompany] = useState(companies[0]);
  const [formDepartment, setFormDepartment] = useState(departments[0]);

  // Filtered and paginated data
  const filtered = useMemo(() => {
    return data.filter(
      (d) =>
        d.department.toLowerCase().includes(search.toLowerCase()) ||
        d.designation.toLowerCase().includes(search.toLowerCase()) ||
        d.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const paginated = filtered.slice((page - 1) * entriesPerPage, page * entriesPerPage);

  // Handlers
  const handleStatusToggle = (id) => {
    setData((arr) => arr.map((d) => (d.id === id ? { ...d, status: !d.status } : d)));
  };

   
  const handleDelete = (id) => {
    if (window.confirm("Delete this designation?")) {
      setData((arr) => arr.filter((d) => d.id !== id));
      // Reset page if after delete, current page is out of range
      if ((page - 1) * entriesPerPage >= filtered.length - 1 && page > 1) {
        setPage(page - 1);
      }
    }
  };

  // Open add form
  const openAddForm = () => {
    setEditingId(null);
    setFormDesignation("");
    setFormCompany(companies[0]);
    setFormDepartment(departments[0]);
    setMode("add");
  };

  // Open edit form filling form state with existing data
  const openEditForm = (id) => {
    const item = data.find((d) => d.id === id);
    if (!item) return;
    setEditingId(id);
    setFormDesignation(item.designation);
    setFormCompany(item.company);
    setFormDepartment(item.department);
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("list");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formDesignation.trim()) {
      alert("Please enter a designation name.");
      return;
    }

    if (mode === "add") {
      const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
      setData((arr) => [
        ...arr,
        {
          id: newId,
          company: formCompany,
          department: formDepartment,
          designation: formDesignation.trim(),
          status: true,
        },
      ]);
      setMode("list");
      setPage(1);
    } else if (mode === "edit") {
      setData((arr) =>
        arr.map((d) =>
          d.id === editingId
            ? {
                ...d,
                company: formCompany,
                department: formDepartment,
                designation: formDesignation.trim(),
              }
            : d
        )
      );
      setMode("list");
      setEditingId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 sm:px-8 py-8 ">
      {mode === "list" && (
        <>
          {/* Header/title and controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
           <h1 className="text-gray-900 text-[5px]">Designation List</h1>

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
                aria-label="Search Designations"
              />
              <button
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded shadow"
                onClick={openAddForm}
                aria-label="Add Designation"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Designation
              </button>
            </div>
          </div>

          {/* Entries per page dropdown */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-800">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
              aria-label="Entries per page"
            >
              {perPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-800">entries per page</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg bg-white shadow-sm">
              <thead>
                <tr className="bg-blue-50 text-left text-gray-900">
                  <th className="py-2 px-3 font-medium text-sm">S.NO</th>
                  <th className="py-2 px-3 font-medium text-sm">COMPANY</th>
                  <th className="py-2 px-3 font-medium text-sm">DEPARTMENT</th>
                  <th className="py-2 px-3 font-medium text-sm">DESIGNATION</th>
                  <th className="py-2 px-3 font-medium text-sm text-center">STATUS</th>
                  <th className="py-2 px-3 font-medium text-sm text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-blue-50 transition-colors text-gray-900">
                      <td className="py-2 px-3">{(page - 1) * entriesPerPage + idx + 1}</td>
                      <td className="py-2 px-3">{row.company}</td>
                      <td className="py-2 px-3">{row.department}</td>
                      <td className="py-2 px-3">{row.designation}</td>
                      <td className="py-2 flex justify-center">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.status}
                            onChange={() => handleStatusToggle(row.id)}
                            className="sr-only peer"
                            aria-label={`Toggle status for ${row.designation}`}
                          />
                          <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-4 transition-transform"></div>
                        </label>
                      </td>
                      <td className="py-2 px-3 text-center space-x-2">
                        <button
                          className="p-1 rounded hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label={`Edit designation ${row.designation}`}
                          onClick={() => openEditForm(row.id)}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-red-100 text-red-600 hover:text-red-800 transition-colors"
                          aria-label={`Delete designation ${row.designation}`}
                          onClick={() => handleDelete(row.id)}
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

          {/* Pagination */}
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
          <h2 className="text-xl font-semibold mb-4">{mode === "add" ? "Add Designation" : "Edit Designation"}</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                Designation Name
              </label>
              <input
                type="text"
                id="designation"
                value={formDesignation}
                onChange={(e) => setFormDesignation(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter designation"
                autoFocus
                required
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
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

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="department"
                value={formDepartment}
                onChange={(e) => setFormDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {departments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                {mode === "add" ? "Add Designation" : "Update Designation"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 py-6 border-t border-gray-200 text-center text-gray-700 text-sm">
        Copyright © 2020-2025 Reliance Corporation. All Rights Reserved.
      </footer>
    </div>
  );
}
