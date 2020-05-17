// event - warning
// emitter - process
module.exports = {
  name: "warning",
  emitter: "process",
  run: async function(info) {
    console.warn(info);
    process.exit();
  }
};
