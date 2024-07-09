import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type AutoCompleteProps = {
  // props
  inputValue: string;
  value: string;
  options: any[];
  placeholder: string;
  autoFocus: boolean;
  isLoading: boolean;
  // event
  fetchSuggestion: () => void;
  onInputChange: () => void;
  onChange: () => void; // called when autocomplete value changes
  onBlur: () => void;
  onFocus: () => void;
  onSearch: () => void;
  onClose: () => void;
  // style
  loadingUI: ReactNode;
  className: string;
  customStyles: CSSProperties;
};

const AutoComplete: FC<AutoCompleteProps> = ({
  // props
  inputValue,
  options,
  placeholder,
  isLoading,
  autoFocus = true,
  // event
  onInputChange,
  onChange,
  // styles
  customStyles,
}) => {
  const [focused, setFocused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectOption = (option: any) => {
    console.log(option);
    onInputChange(option.name);
    onChange(option);
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, []);

  const handleKeyNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key, selectedIdx);
    if (selectedIdx < options.length) {
      if (e.key === "ArrowDown") {
        setSelectedIdx((prev) => (prev + 1) % options.length);
      }
      if (e.key === "ArrowUp") {
        setSelectedIdx((prev) => (prev - 1 + options.length) % options.length);
      }
      if (e.key === "Enter") {
        const option = options[selectedIdx];
        if (option) {
          handleSelectOption(option);
          setSelectedIdx(-1);
        }
      }
      console.log(selectedIdx);
    }
  };

  return (
    <div style={customStyles}>
      <input
        ref={inputRef}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
          setSelectedIdx(-1);
        }}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
        onKeyDown={(e) => {
          handleKeyNav(e);
        }}
        style={customStyles}
        type="text"
      />
      {focused && options.length > 0 && (
        <div
          style={{
            height: 300,
            backgroundColor: "blue",
            overflow: "auto",
          }}
        >
          {isLoading && "loading! "}
          {options.map((opt, i) => (
            <div
              className="option-item"
              key={i}
              onMouseDown={() => {
                handleSelectOption(opt);
              }}
              onMouseEnter={() => {
                setSelectedIdx(i);
              }}
              style={{
                backgroundColor: i === selectedIdx ? "red" : undefined,
              }}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
