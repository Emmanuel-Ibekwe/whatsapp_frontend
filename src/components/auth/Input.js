export default function Input({ register, error, name, type, placeholder }) {
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1 ">
      <label htmlFor={name} className="text-sm font-bold tracking-wide">
        {placeholder}
      </label>
      <input
        className="w-full dark:bg-dark_bg_3 text-base dark:text-dark_text_1 py-2 px-4 rounded-l outline-none"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
