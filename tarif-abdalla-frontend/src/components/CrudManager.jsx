import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../api";

function buildInitialForm(fields) {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || "";
    return acc;
  }, {});
}

function normalizeForEdit(value, type) {
  if (value == null) {
    return "";
  }

  if (type === "date") {
    return String(value).slice(0, 10);
  }

  return String(value);
}

export default function CrudManager({ title, endpoint, fields }) {
  const initialForm = useMemo(() => buildInitialForm(fields), [fields]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  useEffect(() => {
    void loadItems();
  }, [endpoint]);

  async function loadItems() {
    try {
      setIsLoading(true);
      setError("");
      const response = await apiRequest(`/${endpoint}`);
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message || "Failed to load records.");
    } finally {
      setIsLoading(false);
    }
  }

  function onChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId("");
  }

  async function onSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");
      setMessage("");

      const method = editingId ? "PUT" : "POST";
      const path = editingId ? `/${endpoint}/${editingId}` : `/${endpoint}`;

      await apiRequest(path, {
        method,
        body: JSON.stringify(form),
      });

      setMessage(editingId ? `${title} updated successfully.` : `${title} added successfully.`);
      resetForm();
      await loadItems();
    } catch (err) {
      setError(err.message || "Failed to save record.");
    } finally {
      setIsSaving(false);
    }
  }

  function onEdit(item) {
    const nextForm = fields.reduce((acc, field) => {
      acc[field.name] = normalizeForEdit(item[field.name], field.type);
      return acc;
    }, {});

    setForm(nextForm);
    setEditingId(item.id);
    setMessage("");
    setError("");
  }

  async function onDelete(id) {
    if (!window.confirm("Delete this record?")) {
      return;
    }

    try {
      setError("");
      setMessage("");
      await apiRequest(`/${endpoint}/${id}`, { method: "DELETE" });
      setMessage(`${title} deleted successfully.`);

      if (editingId === id) {
        resetForm();
      }

      await loadItems();
    } catch (err) {
      setError(err.message || "Failed to delete record.");
    }
  }

  return (
    <div className="container">
      <div className="section-card">
        <div className="section-header">
          <h1>{title}</h1>
        </div>

        <form className="crud-form" onSubmit={onSubmit}>
          {fields.map((field) => (
            <label key={field.name} className="field-group">
              <span>{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={onChange}
                  required={field.required}
                  rows={4}
                  placeholder={field.placeholder || ""}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={onChange}
                  required={field.required}
                  placeholder={field.placeholder || ""}
                />
              )}
            </label>
          ))}

          <div className="crud-actions">
            <button className="crud-btn primary" type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : editingId ? "Update" : "Add"}
            </button>
            <button className="crud-btn" type="button" onClick={resetForm} disabled={isSaving}>
              Clear
            </button>
            <button className="crud-btn" type="button" onClick={() => void loadItems()} disabled={isSaving}>
              Refresh
            </button>
          </div>
        </form>

        {message ? <p className="message success">{message}</p> : null}
        {error ? <p className="message error">{error}</p> : null}
      </div>

      <div className="section-card">
        <div className="section-header">
          <h2>{title} List</h2>
        </div>

        {isLoading ? <p>Loading...</p> : null}

        {!isLoading && items.length === 0 ? <p>No records found.</p> : null}

        {!isLoading && items.length > 0 ? (
          <div className="record-list">
            {items.map((item) => (
              <article key={item.id} className="record-card">
                <div className="record-content">
                  {fields.map((field) => (
                    <p key={field.name}>
                      <strong>{field.label}:</strong> {item[field.name] || "-"}
                    </p>
                  ))}
                </div>
                <div className="record-actions">
                  <button className="crud-btn" type="button" onClick={() => onEdit(item)}>
                    Edit
                  </button>
                  <button className="crud-btn danger" type="button" onClick={() => void onDelete(item.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
