module.exports = {
  devServer: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
};
