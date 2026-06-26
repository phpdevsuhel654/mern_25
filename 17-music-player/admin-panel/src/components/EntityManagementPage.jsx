import React, { useCallback, useEffect, useMemo, useState } from 'react';

const normalizeInitialState = (fields, value = {}) => {
  return fields.reduce((acc, field) => {
    acc[field.name] = value[field.name] ?? field.defaultValue ?? '';
    return acc;
  }, {});
};

const EntityManagementPage = ({
  title,
  description,
  fields,
  service,
  tableColumns,
  emptyStateText
}) => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(() => normalizeInitialState(fields));
  const [feedback, setFeedback] = useState('');

  const loadItems = useCallback(async () => {
    const data = await service.list();
    setItems(Array.isArray(data) ? data : []);
  }, [service]);

  useEffect(() => {
    loadItems().catch((error) => {
      setFeedback(error?.response?.data?.message || 'Failed to load data');
    });
  }, [loadItems]);

  const columns = useMemo(() => {
    if (tableColumns?.length) {
      return tableColumns;
    }

    return fields.map((field) => ({
      key: field.name,
      label: field.label,
      render: (item) => item[field.name] || '-'
    }));
  }, [fields, tableColumns]);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setForm(normalizeInitialState(fields));
  }, [fields]);

  const submit = async (event) => {
    event.preventDefault();
    setFeedback('');

    try {
      const payload = { ...form };
      fields.forEach((field) => {
        if (field.type === 'number' && payload[field.name] !== '') {
          payload[field.name] = Number(payload[field.name]);
        }
      });

      if (editingId) {
        await service.update(editingId, payload);
        setFeedback('Updated successfully');
      } else {
        await service.create(payload);
        setFeedback('Created successfully');
      }

      resetForm();
      await loadItems();
    } catch (error) {
      setFeedback(error?.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm(normalizeInitialState(fields, item));
  };

  const handleDelete = async (id) => {
    setFeedback('');

    try {
      await service.remove(id);
      if (String(editingId) === String(id)) {
        resetForm();
      }
      await loadItems();
    } catch (error) {
      setFeedback(error?.response?.data?.message || 'Failed to delete item');
    }
  };

  return (
    <section>
      <h1>{title}</h1>
      <article className="panel">
        <p>{description}</p>
      </article>

      <form className="panel form-grid" onSubmit={submit}>
        <h3>{editingId ? 'Edit Item' : 'Create Item'}</h3>
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <select
                key={field.name}
                value={form[field.name]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
              >
                {(field.options || []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          }

          if (field.type === 'textarea') {
            return (
              <textarea
                key={field.name}
                rows={3}
                placeholder={field.label}
                value={form[field.name]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
              />
            );
          }

          return (
            <input
              key={field.name}
              type={field.type || 'text'}
              placeholder={field.label}
              value={form[field.name]}
              onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
            />
          );
        })}

        {feedback && <p className="helper-text">{feedback}</p>}

        <div className="row-actions">
          <button type="submit">{editingId ? 'Update' : 'Create'}</button>
          {editingId ? (
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="panel">
        <table className="song-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={`${item.id}_${column.key}`}>
                      {column.render ? column.render(item) : item[column.key] || '-'}
                    </td>
                  ))}
                  <td className="action-cell">
                    <button type="button" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1}>{emptyStateText || 'No items created yet.'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EntityManagementPage;
