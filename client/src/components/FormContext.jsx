import { createContext, useContext, useState } from "react";

// Create Form Context
const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {

  const initialFormData = [];
  const [formData, setFormData] = useState(initialFormData);

  // Add new component
  const addComponent = (type) => {
    setFormData((prev) => [
      ...prev,
      { id: Date.now(), type, title: "", isRequired: false, options: [] }, // Default values
    ]);
  };
  
  // Function to reset formData
  const resetFormData = () => {
    setFormData(initialFormData); // Reset to the initial state (empty array)
  };

  // Update a specific component
  const updateComponent = (id, updatedData) => {
    setFormData((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, ...updatedData } : component
      )
    );
  };

  // Remove a component
  const removeComponent = (id) => {
    setFormData((prev) => prev.filter((component) => component.id !== id));
  };

  // Duplicate a component
  const duplicateComponent = (id) => {
    setFormData((prev) => {
      const itemToDuplicate = prev.find((comp) => comp.id === id);
      if (!itemToDuplicate) return prev;
      // Create a new component by copying the original but with a new id
      return [...prev, { ...itemToDuplicate, id: Date.now() }];
    });
  };
  
  return (
    <FormContext.Provider
      value={{ formData, addComponent, updateComponent, removeComponent, duplicateComponent, resetFormData  }}
    >
      {children}
    </FormContext.Provider>
  );
};
