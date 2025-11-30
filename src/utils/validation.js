function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isValidId(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
}

module.exports = {
  isNonEmptyString,
  isBoolean,
  isValidId,
};
