// event - uncaughtException
// emitter - process
module.exports = {
  name: "uncaughtException",
  emitter: "process",
  run: async function(err, orign) {
    console.error(err);
    process.exit();
  }
};
