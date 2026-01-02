const wrapSocketAsync = (fn) => {
  return async (data) => {
    try {
      await fn(data);
    } catch (err) {
      console.error('Socket error:', err);
      // emit back to the same socket
      socket.emit('error', { message: err.message });
    }
  };
};

export default wrapSocketAsync;
