const wrapSocketAsync = (fn) => {
  return async (data) => {
    try {
      await fn(data);
    } catch (err) {
      console.error('Socket error:', err);
    }
  };
};

export default wrapSocketAsync;
