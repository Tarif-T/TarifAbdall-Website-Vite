import { startTransition, useCallback, useEffect, useMemo, useState } from "react";

import { apiRequest } from "../api";

// Builds the default form object from field configuration.
function buildInitialForm(fields) {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? "";
    return acc;
  }, {});
}

// Maps an existing record value into an editable form value.
function normalizeForEdit(field, item) {
  if (field.clearOnEdit) {
    return "";
  }

  const value = item[field.name];

  if (value == null) {
    return "";
  }

  if (field.type === "date") {
    return String(value).slice(0, 10);
  }

  return String(value);
}

// Resolves required state based on create or edit mode.
function getFieldRequired(field, isEditing) {
  if (isEditing) {
    return field.requiredOnEdit ?? field.required ?? false;
  }

  return field.requiredOnCreate ?? field.required ?? false;
}

// Returns a display-safe value for list rendering.
function getDisplayValue(field, item) {
  const rawValue = item[field.name];

  if (typeof field.formatListValue === "function") {
    return field.formatListValue(rawValue, item);
  }

  return rawValue || "-";
}

// Reusable CRUD UI for protected resources.
export default function CrudManager({
  title,
  endpoint,
  fields,
  requiresAuth = false,
  intro = "",
  listTitle,
  emptyMessage = "No records found yet.",
}) {
  const initialForm = useMemo(() => buildInitialForm(fields), [fields]);
  const visibleFields = useMemo(() => fields.filter((field) => !field.hideOnList), [fields]);
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

  // Fetches records from the API and updates the visible list.
  const loadItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await apiRequest(`/${endpoint}`);

      startTransition(() => {
        setItems(Array.isArray(response.data) ? response.data : []);
      });
    } catch (err) {
      setError(err.message || "Failed to load records.");
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  // Handles controlled input updates.
  function onChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  // Resets the form and exits edit mode.
  function resetForm() {
    setForm(initialForm);
    setEditingId("");
  }

  // Builds a request payload while honoring field omission rules.
  function buildPayload() {
    return fields.reduce((acc, field) => {
      const value = form[field.name];

      if (field.omitWhenEmpty && value === "") {
        return acc;
      }

      acc[field.name] = value;
      return acc;
    }, {});
  }

  // Creates or updates a record based on current mode.
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
        auth: requiresAuth,
        body: JSON.stringify(buildPayload()),
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

  // Loads a record into the form for editing.
  function onEdit(item) {
    const nextForm = fields.reduce((acc, field) => {
      acc[field.name] = normalizeForEdit(field, item);
      return acc;
    }, {});

    setForm(nextForm);
    setEditingId(item.id);
    setMessage("");
    setError("");
  }

  // Deletes a record after user confirmation.
  async function onDelete(id) {
    if (!globalThis.confirm("Delete this record?")) {
      return;
    }

    try {
      setError("");
      setMessage("");
      await apiRequest(`/${endpoint}/${id}`, { method: "DELETE", auth: requiresAuth });
      setMessage(`${title} deleted successfully.`);

      if (editingId === id) {
        resetForm();
      }

      await loadItems();
    } catch (err) {
      setError(err.message || "Failed to delete record.");
    }
  }

  let submitLabel = "Add";

  if (editingId) {
    submitLabel = "Update";
  }

  if (isSaving) {
    submitLabel = "Saving...";
  }

  return (
    <div className="crud-shell">
      <div className="section-card">
        <div className="section-header">
          <div>
            <p className="eyebrow">Protected Manager</p>
            <h2>{editingId ? `Edit ${title}` : `Create ${title}`}</h2>
          </div>
        </div>

        {intro ? <p className="section-lead">{intro}</p> : null}

        <form className="crud-form" onSubmit={onSubmit}>
          {fields.map((field) => {
            const required = getFieldRequired(field, Boolean(editingId));

            return (
              <label key={field.name} className="field-group">
                <span>{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={onChange}
                    required={required}
                    rows={4}
                    placeholder={field.placeholder || ""}
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={onChange}
                    required={required}
                    placeholder={field.placeholder || ""}
                  />
                )}
              </label>
            );
          })}

          <div className="crud-actions">
            <button className="crud-btn primary" type="submit" disabled={isSaving}>
              {submitLabel}
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
          <div>
            <p className="eyebrow">Current Data</p>
            <h2>{listTitle || `${title} List`}</h2>
          </div>
        </div>

        {isLoading ? <p>Loading...</p> : null}
        {!isLoading && items.length === 0 ? <p className="empty-state">{emptyMessage}</p> : null}

        {!isLoading && items.length > 0 ? (
          <div className="record-list">
            {items.map((item) => (
              <article key={item.id} className="record-card">
                <div className="record-content">
                  {visibleFields.map((field) => (
                    <p key={field.name}>
                      <strong>{field.label}:</strong> {getDisplayValue(field, item)}
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
