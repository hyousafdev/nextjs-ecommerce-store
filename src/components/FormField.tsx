type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

export default function FormField({
  id,
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}