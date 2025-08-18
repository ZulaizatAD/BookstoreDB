import React, { useState, useEffect, useCallback, memo } from "react";
import {
  BookOpenIcon,
  UserIcon,
  CurrencyDollarIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const InputField = memo(
  ({
    name,
    label,
    type = "text",
    icon: Icon,
    step,
    min,
    value,
    onChange,
    onBlur,
    hasError,
    errorMessage,
    ...props
  }) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-slate-gray"
        >
          {label}
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              className={`h-5 w-5 transition-colors duration-200 ${
                hasError
                  ? "text-red-400"
                  : "text-cadetblue group-focus-within:text-cadetblue-dark"
              }`}
            />
          </div>
          <input
            id={name}
            type={type}
            step={step}
            min={min}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`form-input pl-10 ${
              hasError ? "form-input-error" : ""
            } hover:border-cadetblue-light`}
            {...props}
          />
        </div>
        {hasError && (
          <p className="text-sm text-red-600 flex items-center space-x-1 animate-slide-up">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errorMessage}</span>
          </p>
        )}
      </div>
    );
  }
);

const BookForm = ({ value, onChange, valid, onValidChange, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation rules - memoized to prevent recreation
  const validateField = useCallback((name, val) => {
    switch (name) {
      case "title":
        if (!val) return "Title is required";
        if (val.length < 2) return "Title must be at least 2 characters";
        return "";
      case "author":
        if (!val) return "Author is required";
        if (val.length < 2) return "Author must be at least 2 characters";
        return "";
      case "price":
        if (val === null || val === undefined || val === "")
          return "Price is required";
        if (val < 0) return "Price must be 0 or greater";
        return "";
      case "qty":
        if (val === null || val === undefined || val === "")
          return "Quantity is required";
        if (val < 0) return "Quantity must be 0 or greater";
        if (!Number.isInteger(Number(val)))
          return "Quantity must be a whole number";
        return "";
      default:
        return "";
    }
  }, []);

  // Validate all fields - memoized
  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(value).forEach((key) => {
      const error = validateField(key, value[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [value, validateField]);

  // Update validation state
  useEffect(() => {
    const isValid = validateForm();
    onValidChange(isValid);
  }, [validateForm, onValidChange]);

  // Memoized change handler
  const handleChange = useCallback(
    (name) => (e) => {
      const val =
        e.target.type === "number" ? Number(e.target.value) : e.target.value;
      onChange({
        ...value,
        [name]: val,
      });
    },
    [value, onChange]
  );

  // Memoized blur handler
  const handleBlur = useCallback(
    (name) => () => {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    },
    []
  );

  // Memoized submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (valid) {
        onSubmit(value);
      }
    },
    [valid, onSubmit, value]
  );

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="card-header">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <BookOpenIcon className="h-6 w-6" />
          <span>Book Information</span>
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <InputField
              name="title"
              label="Book Title"
              icon={BookOpenIcon}
              value={value.title}
              onChange={handleChange("title")}
              onBlur={handleBlur("title")}
              hasError={touched.title && errors.title}
              errorMessage={errors.title}
              placeholder="Enter book title..."
              required
            />

            <InputField
              name="author"
              label="Author"
              icon={UserIcon}
              value={value.author}
              onChange={handleChange("author")}
              onBlur={handleBlur("author")}
              hasError={touched.author && errors.author}
              errorMessage={errors.author}
              placeholder="Enter author name..."
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                name="price"
                label="Price ($)"
                type="number"
                step="0.01"
                min="0"
                icon={CurrencyDollarIcon}
                value={value.price}
                onChange={handleChange("price")}
                onBlur={handleBlur("price")}
                hasError={touched.price && errors.price}
                errorMessage={errors.price}
                placeholder="0.00"
                required
              />

              <InputField
                name="qty"
                label="Quantity"
                type="number"
                min="0"
                icon={CubeIcon}
                value={value.qty}
                onChange={handleChange("qty")}
                onBlur={handleBlur("qty")}
                hasError={touched.qty && errors.qty}
                errorMessage={errors.qty}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-light-steel-blue">
            <button
              type="submit"
              disabled={!valid}
              className={`btn-primary ${
                !valid ? "opacity-50 cursor-not-allowed transform-none" : ""
              }`}
            >
              {valid ? (
                <span className="flex items-center space-x-2">
                  <span>Submit</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              ) : (
                "Please complete all fields"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(BookForm);
