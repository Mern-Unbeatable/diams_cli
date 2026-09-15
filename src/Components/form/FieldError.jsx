/**
 * Small field error line for react-hook-form.
 */
export const FieldError = ({ message, className = "" }) => {
  if (!message) return null;
  return (
    <p className={`mt-1 text-[11px] font-medium text-rose-600 ${className}`}>
      {message}
    </p>
  );
};

export default FieldError;
