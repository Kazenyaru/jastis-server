export const statusType = {
  success: 'success',
  error: 'error',
};

export const response = (
  status = statusType.error,
  message = '',
  data = ''
) => {
  return {
    status,
    message,
    data,
  };
};
