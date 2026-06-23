import React from 'react';

import ConverterForm from '../components/ConverterForm';
import ConversionResult from '../components/ConversionResult';
import useConverter from '../hooks/useConverter';
import { CATEGORIES } from '../utils/unitOptions';

function ConverterPage() {
  const {
    category,
    fromUnit,
    toUnit,
    value,
    units,
    result,
    error,
    isLoading,
    handleChange,
    swapUnits
  } = useConverter();

  return (
    <main className="page">
      <h1>Unit Converter</h1>

      <ConverterForm
        form={{
          category,
          categories: CATEGORIES,
          fromUnit,
          toUnit,
          units,
          value
        }}
        onChange={handleChange}
        onSwapUnits={swapUnits}
      />

      <ConversionResult
        isLoading={isLoading}
        error={error}
        result={result}
        value={value}
        fromUnit={fromUnit}
        toUnit={toUnit}
      />
    </main>
  );
}

export default ConverterPage;
