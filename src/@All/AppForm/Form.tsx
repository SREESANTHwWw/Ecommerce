import type { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { FieldPathValue } from "react-hook-form";
import { Listbox } from "@headlessui/react";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

type TextControlType<T extends FieldValues = FieldValues> = {
  id: string;
  name: Path<T>;
  label?: string;
  control?: Control<T>;
  type: string;
  placeholder: string;
  className?: string;
disabled?: boolean;
  defaultValue?: FieldPathValue<T, Path<T>>;

  rows?: number;
  readOnly?: boolean;
   rules?: Omit<RegisterOptions<T, Path<T>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">; // <-- new prop
 
};


export const TextController = <T extends FieldValues>({
  id,
  name,
  label,
  control,
  type,
  placeholder,
  disabled = false,
  defaultValue,
  rows,
  className,
  readOnly = false,
  rules,
}: TextControlType<T>) => {

  // 👁 password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);

  // dynamic input type
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
  const emailRule =
  type === "email"
    ? {
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Enter a valid email address",
        },
      }
    : {};

  return (
    <div className="mb-4">
      <Typography className="block px-0 text-sm font-medium">{label}</Typography>

      <Controller
        name={name}
        control={control}
        rules={{  ...rules, ...emailRule }}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <div className="relative">
            {type === "textarea" ? (
              <textarea
                {...field}
                id={id}
                placeholder={placeholder}
                rows={rows}
                readOnly={readOnly}
                disabled={disabled}
                className={`w-full px-4 py-2 rounded border font-[Share_Tech] focus:outline-none focus:ring-1 resize-y ${
                  fieldState.error
                    ? "border-red-500 focus:ring-red-500"
                    : fieldState.isDirty && !fieldState.invalid
                    ? "border-green-500 focus:ring-green-500"
                    : "border-gray-300 focus:ring-[var(--main-web-color-2)]"
                } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""} ${className || ""}`}
              />
            ) : (
              <>
                <input
                  {...field}
                  type={inputType}
                  id={id}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  disabled={disabled}
                  className={`w-full px-4 py-2 rounded border font-[Share_Tech] focus:outline-none focus:ring-1 ${
                    fieldState.error
                      ? "border-red-500 focus:ring-red-500"
                      : fieldState.isDirty && !fieldState.invalid
                      ? "border-[var(--main-web-color-2)] focus:ring-[var(--main-web-color-2)]"
                      : "border-gray-300 focus:ring-[var(--main-web-color-2)]"
                  } ${readOnly ? "bg-gray-300 cursor-not-allowed" : ""} ${className || ""}`}
                />

                {/* 👁 Password Eye Icon */}
                {type === "password" && (
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </span>
                )}
              </>
            )}

            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};



type ButtonProps<T extends FieldValues = FieldValues> = {
  type: "submit" | "button" | "reset" | undefined;
  className?: string;
  children: React.ReactNode;
  size?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};



export const Button = ({
  type = "button",
  className = "",
  children,
  style,
}: ButtonProps) => {
  return (
    <button
      type={type}
      style={style}
      className={`
        px-4 py-2 rounded shadow-sm text-white cursor-pointer
        w-20 h-10 transition-all duration-300
        ${className}
      `}
    >
      {children}
    </button>
  );
};


type TypographyProps = {
  children: React.ReactNode; // The text/content to display
  size?: string; // Tailwind text size (e.g. "text-xl")
  color?: string; // Tailwind color (e.g. "text-gray-700")
  className?: string;
  style?: React.CSSProperties; // Any extra Tailwind/utility classes
};

export const Typography = ({
  children,
  style,
  color,
  className = "",
}: TypographyProps) => {
  return (
    <span
      style={style}
      className={`font-[Share_Tech]  ${color} ${className}`}
    >
      {children}
    </span>
  );
};

type FileControllerType<T extends FieldValues = FieldValues> = {
  id: string;
  name: Path<T>;
  label: string;

  control: Control<T>;
  type: string;
  placeholder: string;
  multiple?: boolean;
};

export const FileController = <T extends FieldValues>({
  id,
  name,
  label,
  control,
  multiple= false,

}: FileControllerType<T>) => {
  return (
    <div className="mb-4 ">
      <Typography className="block px-0 text-sm font-medium">
        {label}
      </Typography>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const files: File[] = field.value || [];

          return (
            <div className="flex items-start gap-4 w-full " 
             
            >
             
              <div>
                <input
                  type="file"
                  multiple={multiple}
                  id={id}
                  className="hidden"
                  onChange={(e) => {
                    const selectedFiles = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    const newFiles = multiple
                      ? [...files, ...selectedFiles]
                      : selectedFiles;
                    field.onChange(newFiles);
                  }}
                />

                <label
                  htmlFor={id}
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-[#49225B] hover:bg-purple-50 transition"
                  style={{ minWidth: "150px", minHeight: "100px" }}
                >
                  <svg
                    className="w-8 h-8 mb-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-sm">Click to upload</span>
                </label>
              </div>

              {/* Preview all selected images */}
              <div className="flex w-full gap-2">
                {files.map((file, idx) => {
                  const isImage = file.type.startsWith("image/");
                  return (
                    <div key={idx} className="flex flex-col w-full  items-center">
                      {isImage ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded border"
                        />
                      ) : (
                        <span className="text-sm">{file.name}</span>
                      )}
                      <button
                        type="button"
                        className="text-xs text-red-500 hover:underline mt-1"
                        onClick={() => {
                          const newFiles = files.filter((_, i) => i !== idx);
                          field.onChange(newFiles.length ? newFiles : []); // never undefined
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

type OptionType<TValue = string> = {
  value: TValue;
  label: string;
};


type OptionControllerType<
  TFieldValues extends FieldValues = FieldValues,
  TValue = FieldPathValue<TFieldValues, Path<TFieldValues>>
> = {
  id: string;
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  placeholder?: string;
  defaultValue?: TValue;
  options: OptionType<TValue>[]; // ✅ now strongly typed
}; 

export const OptionController = <T extends FieldValues>({
 
  name,
  label,
  control,
 defaultValue,
  options,
}: OptionControllerType<T>) => {
  return (
    <div className="mb-4">
      <Typography className="block px-0  text-sm font-medium">
        {label}
      </Typography>

      <Controller
        name={name}
        control={control}
          defaultValue={defaultValue}
        render={({ field }) => (
          <Listbox value={field.value} onChange={field.onChange}>
            <div className="relative">
              {/* Button */}
              <Listbox.Button className="w-full rounded border border-gray-300 px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--main-web-color-2)]">
                {field.value
                  ? options.find((opt) => opt.value === field.value)?.label
                  : "Select an option"}
              </Listbox.Button>

              {/* Options */}
              <Listbox.Options className="absolute z-10 mt-1 w-full  shadow-lg border border-[var(--main-bg-color)] max-h-60 overflow-auto">
                {options.map((opt) => (
                  <Listbox.Option
                    key={opt.value}
                    value={opt.value}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${
                        active
                          ? "bg-[var(--main-web-color)] text-white"
                          : "bg-white text-black"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center gap-2">
                        {selected && (
                          <DoneOutlinedIcon className="h-4 w-4 text-blue-500" />
                        )}
                        <Typography>{opt.label}</Typography>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        )}
      />
    </div>
  );
};


type CommonImageProps = {
  src: string;
  alt?: string;
  className?: string;
  fallback?: string;
  onClick?: () => void; 
};

export const CommonImage: React.FC<CommonImageProps> = ({
  src,
  alt = "image",
  className = "",
  fallback = "/no-image.svg",
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={` overflow-hidden  ${className}`}>
    
      {!loaded && !error && (
        <div className=" animate-pulse bg-gray-200" />
      )}

      <img
    
        src={error ? fallback : src}
        alt={alt}
        loading="lazy"
        onClick={onClick}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};


