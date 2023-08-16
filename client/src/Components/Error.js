import './Error.js';

export default function Error({ error }) {
  return (
    <div id="error-container">
      <span>{error}</span>
    </div>
  );
}
