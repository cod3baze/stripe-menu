import React, { useState, useCallback, useEffect } from 'react';

export const Context = React.createContext();

export function DropdownProvider({ children }) {
  const [options, setOptions] = useState([]);
  const [targetId, setTargetId] = useState(null);
  const [cachedId, setCacheId] = useState(null);

  const registerOptions = useCallback(({
    id, optionDimentions, optionCenterX, WrappedContent, backgroundHeight,
  }) => {
    setOptions((items) => [
      ...items, {
        id, optionDimentions, optionCenterX, WrappedContent, backgroundHeight,
      },
    ]);
  }, [setOptions]);

  const updateOptionProps = useCallback((optionId, props) => {
    setOptions((items) => (items.map((item) => {
      if (item.id === optionId) {
        item = { ...item, ...props };
      }

      return item;
    })));
  }, [setOptions]);

  const getOptionById = useCallback(
    (id) => options.find((item) => item.id === id),
    [options],
  );

  const deleteOptionById = useCallback((id) => {
    setOptions((items) => items.filter((item) => item.id !== id));
  }, [options]);

  useEffect(() => {
    if (targetId !== null) setCacheId(targetId);
  }, [targetId]);

  return (
    <Context.Provider value={{
      registerOptions,
      updateOptionProps,
      getOptionById,
      deleteOptionById,
      options,
      targetId,
      setTargetId,
      cachedId,
      setCacheId,
    }}
    >
      {children}
    </Context.Provider>
  );
}
