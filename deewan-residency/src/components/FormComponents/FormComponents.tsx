import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea';
  value: string | number;
  error?: string;
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  error,
  touched = false,
  required = false,
  placeholder,
  options,
  rows = 4,
  min,
  max,
  disabled = false,
  onChange,
  onBlur,
}: FormFieldProps) {
  const hasError = touched && error;
  const hasSuccess = touched && !error && value;

  const baseInputClasses = `
    w-full px-4 py-2.5 rounded-lg border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${hasError 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
      : hasSuccess
        ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
    }
  `;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={baseInputClasses}
          required={required}
        >
          <option value="">Select {label}</option>
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          className={baseInputClasses}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          min={min}
          max={max}
          className={baseInputClasses}
          required={required}
        />
      )}

      {/* Success/Error Icons */}
      <div className="relative">
        {hasSuccess && (
          <div className="absolute right-3 top-[-32px] pointer-events-none">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
        )}
        {hasError && (
          <div className="absolute right-3 top-[-32px] pointer-events-none">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

interface FormStatusProps {
  type: 'success' | 'error' | 'loading' | null;
  message: string;
  retryCount?: number;
}

export function FormStatus({ type, message, retryCount }: FormStatusProps) {
  if (!type) return null;

  return (
    <div className={`
      p-4 rounded-lg border flex items-start gap-3 mb-4
      ${type === 'success' ? 'bg-green-50 border-green-200' : ''}
      ${type === 'error' ? 'bg-red-50 border-red-200' : ''}
      ${type === 'loading' ? 'bg-blue-50 border-blue-200' : ''}
    `}>
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />}
      {type === 'error' && <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />}
      {type === 'loading' && <Loader2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 animate-spin" />}
      
      <div className="flex-1">
        <p className={`text-sm font-medium ${
          type === 'success' ? 'text-green-800' : 
          type === 'error' ? 'text-red-800' : 
          'text-blue-800'
        }`}>
          {message}
        </p>
        {retryCount && retryCount > 0 && (
          <p className="text-xs text-gray-600 mt-1">
            Retry attempts: {retryCount}
          </p>
        )}
      </div>
    </div>
  );
}

interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

export function SubmitButton({ 
  isSubmitting, 
  disabled = false, 
  children, 
  loadingText = 'Submitting...' 
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className={`
        w-full py-3 px-6 rounded-lg font-medium text-white
        transition-all duration-200 flex items-center justify-center gap-2
        ${isSubmitting || disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-md hover:shadow-lg'
        }
      `}
    >
      {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
      {isSubmitting ? loadingText : children}
    </button>
  );
}
