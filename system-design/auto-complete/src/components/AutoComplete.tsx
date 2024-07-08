import { CSSProperties, FC, ReactNode, useState } from "react";

type AutoCompleteProps = {
  // data
  options: any;
  placeholder: string;
  // event
  fetchSuggestion: () => void;
  onChange: () => void;
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
  data,
  placeholder,
  fetchSuggestion,
  customStyles,
}) => {
  const [val, setVal] = useState("");

  const handleInput = (e) => {
    setVal(e.target.value);
  };
  return (
    <div>
      <input
        value={val}
        placeholder={placeholder}
        onChange={handleInput}
        style={customStyles}
      />
    </div>
  );
};

export default AutoComplete;
