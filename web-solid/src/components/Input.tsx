import { Setter, createSignal } from "solid-js";

export default function Input(props: {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  setter: Setter<string>;
  isError?: boolean;
  errorValidityMessage?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}) {
  const [isError, setIsError] = createSignal(false);
  const {
    id,
    name,
    type,
    placeholder,
    errorValidityMessage,
    value,
    setter,
    minLength,
    maxLength,
    pattern,
  } = props;
  return (
    <>
      <label for={id} class="bg-mainDark flex flex-col m-2">
        {name}
      </label>
      <input
        aria-describedby="is_error"
        class="bg-secDark border border-mainText text-mainText text-sm rounded-lg focus:ring-secDark focus:border-secDark w-full p-2.5 appearance-none"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => {
          setIsError(!e.target.checkValidity());
          setter(e.target.value);
        }}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
      />
      <div class="absolute">
        {isError() && errorValidityMessage && (
          <p id="is_error" class="text-mainErr m-2 text-xs w-60 text-wrap">
            {errorValidityMessage}
          </p>
        )}
      </div>
    </>
  );
}
