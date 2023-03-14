import "./form-input.styles.scss";

const FormInput = ({ label, htmlOptions }) => {
  return (
    <div className="group">
      <input className="form-input" {...htmlOptions} />
      {label && (
        <label
          className={`${
            htmlOptions.value.length ? "shrink" : null
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
