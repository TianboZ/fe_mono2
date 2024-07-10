import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type AutoCompleteProps = {
  // props
  options: any[];
  inputValue: string;
  isLoading: boolean;
  placeholder: string;
  // events
  onInputChange: (v: string) => void;
  onChange: (v: any) => void;
  renderOption?: (v: any) => ReactNode;
  // styles
  customInputStyles?: CSSProperties;
  customDropdownStyles?: CSSProperties;
  customButtonStyles?: CSSProperties;
};

const AutoComplete = ({
  options,
  placeholder,
  inputValue,
  isLoading,
  customInputStyles,
  onInputChange,
  onChange,
  renderOption,
}: AutoCompleteProps) => {
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>();

  const handleNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const size = options.length;

    if (e.key === "ArrowDown") {
      setActiveIdx((prev) => (prev + 1) % size);
    }
    if (e.key === "ArrowUp") {
      setActiveIdx((prev) => (prev - 1 + size) % size);
    }
    if (e.key === "Enter") {
      handleSelectOption(activeIdx);
    }
  };

  const handleSelectOption = (i) => {
    setActiveIdx(i);
    const option = options[i];
    onInputChange(option.name);
    inputRef.current?.blur();
    onChange(option);
  };

  useEffect(() => {
    setActiveIdx(-1);
  }, [options]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      {/* <div>activeIdx: {activeIdx}</div> */}
      <input
        ref={inputRef}
        value={inputValue}
        type="text"
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
        placeholder={placeholder}
        onBlur={() => {
          setFocused(false);
        }}
        onFocus={() => {
          setFocused(true);
        }}
        onKeyDown={(e) => {
          handleNav(e);
        }}
        style={customInputStyles}
      />
      <button
        onClick={() => {
          onInputChange("");
        }}
      >
        clear
      </button>
      {focused && options.length > 0 && (
        <div
          style={{ height: 200, backgroundColor: "blue", overflow: "scroll" }}
        >
          <div>{isLoading ? "loading" : ""}</div>
          {options.map((data, i) => {
            if (renderOption) {
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: i === activeIdx ? "red" : undefined,
                  }}
                  onMouseDown={() => {
                    handleSelectOption(i);
                  }}
                  onMouseEnter={() => {
                    setActiveIdx(i);
                  }}
                >
                  {renderOption(data)}
                </div>
              );
            } else {
              <div
                key={i}
                style={{
                  backgroundColor: i === activeIdx ? "red" : undefined,
                }}
                onMouseDown={() => {
                  handleSelectOption(i);
                }}
                onMouseEnter={() => {
                  setActiveIdx(i);
                }}
              >
                {JSON.stringify(data.name)}
              </div>;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
