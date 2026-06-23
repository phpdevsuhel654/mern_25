import React from 'react';

function ConversionResult({ isLoading, error, result, value, fromUnit, toUnit }) {
  return (
    <section className="result-card" aria-live="polite">
      {isLoading && <p className="status-text">Converting...</p>}
      {!isLoading && error && <p className="error-text">{error}</p>}
      {!isLoading && !error && result !== null && (
        <>
          <p className="result-title">Converted Value</p>
          <p className="result-value">{result}</p>
          <p className="result-formula">
            {value} {fromUnit} = {result} {toUnit}
          </p>
        </>
      )}
    </section>
  );
}

export default ConversionResult;
