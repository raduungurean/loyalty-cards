import * as PropTypes from 'prop-types';

function CloseDialogButton(props) {
  return (
    <button
      onClick={props.onClick}
      className="text-gray-500 hover:text-gray-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 8.586L15.95 2.636a1 1 0 1 1 1.414 1.414L11.414 10l5.95 5.95a1 1 0 1 1-1.414 1.414L10 11.414l-5.95 5.95a1 1 0 1 1-1.414-1.414L8.586 10 2.636 4.05A1 1 0 1 1 4.05 2.636L10 8.586z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

CloseDialogButton.propTypes = { onClick: PropTypes.any };

export default CloseDialogButton;
