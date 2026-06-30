import React from 'react';

const RichTextEditor = ({ value = '', onChange, placeholder, maxLength }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    onChange?.(newValue);
  };

  const charCount = value?.length || 0;

  return (
    <div className="rich-text-editor">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={5}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontFamily: 'inherit',
          fontSize: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          resize: 'vertical'
        }}
      />
      {maxLength && (
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          {charCount} / {maxLength} characters
        </p>
      )}
    </div>
  );
};

export default RichTextEditor;
