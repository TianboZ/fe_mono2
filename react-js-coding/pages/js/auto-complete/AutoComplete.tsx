type AutoCompleteProps = {
  data: any[];
  inputValue: string;
  onInputChange: (input: string) => void;
};

const AutoComplete = ({
  data,
  inputValue,
  onInputChange,
}: AutoCompleteProps) => {
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
      />
      {data.map((d, i) => (
        <div key={i}>{d}</div>
      ))}
    </div>
  );
};

export default AutoComplete;
