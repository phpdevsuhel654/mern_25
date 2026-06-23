import React from 'react';

function ConverterForm({ form, onChange, onSwapUnits }) {
  return (
    <section className="converter-card">
      <label className="field-label">
        Category
        <select name="category" value={form.category} onChange={onChange}>
          {form.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <div className="unit-row">
        <label className="field-label">
          From Unit
          <select name="fromUnit" value={form.fromUnit} onChange={onChange}>
            {form.units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="swap-button" onClick={onSwapUnits}>
          Swap
        </button>

        <label className="field-label">
          To Unit
          <select name="toUnit" value={form.toUnit} onChange={onChange}>
            {form.units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field-label">
        Value
        <input
          type="number"
          name="value"
          value={form.value}
          onChange={onChange}
          step="any"
        />
      </label>
    </section>
  );
}

export default ConverterForm;
