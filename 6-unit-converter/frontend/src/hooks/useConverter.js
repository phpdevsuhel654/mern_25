import { useEffect, useMemo, useState } from 'react';

import { convertUnit } from '../services/converterService';
import { UNIT_OPTIONS } from '../utils/unitOptions';

function useConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState(UNIT_OPTIONS.length[0]);
  const [toUnit, setToUnit] = useState(UNIT_OPTIONS.length[1]);
  const [value, setValue] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const units = useMemo(() => UNIT_OPTIONS[category], [category]);

  useEffect(() => {
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [units]);

  useEffect(() => {
    let isCancelled = false;

    const timeoutId = setTimeout(async () => {
      if (value === '' || Number.isNaN(Number(value))) {
        setResult(null);
        setError('Please enter a valid number');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const response = await convertUnit({
          category,
          fromUnit,
          toUnit,
          value: Number(value)
        });

        if (!isCancelled) {
          setResult(response.result);
        }
      } catch (apiError) {
        if (!isCancelled) {
          const message = apiError?.response?.data?.message || 'Conversion failed';
          setError(message);
          setResult(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [category, fromUnit, toUnit, value]);

  const handleChange = (event) => {
    const { name, value: fieldValue } = event.target;

    if (name === 'category') {
      setCategory(fieldValue);
      return;
    }

    if (name === 'fromUnit') {
      setFromUnit(fieldValue);
      return;
    }

    if (name === 'toUnit') {
      setToUnit(fieldValue);
      return;
    }

    setValue(fieldValue);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return {
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
  };
}

export default useConverter;
