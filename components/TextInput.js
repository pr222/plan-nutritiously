import PropTypes from 'prop-types';

// const TextInput = ({ children }) => (
const TextInput = ({ formName, uiName, placeholder }) => (
  <>
    <label htmlFor={formName}>
      {uiName}
      <input
        type="text"
        id={formName}
        name={formName}
        placeholder={placeholder}
      />
    </label>
  </>
);

TextInput.propTypes = {
  // children: PropTypes.node.isRequired,
  formName: PropTypes.string.isRequired,
  uiName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default TextInput;
