const defaults = {};

module.exports = (opt = {}) => {
  const option = { ...defaults, opt };

  const customMidBefore = async (request) => {
    console.log("FROM customMidBefore");
    // console.log(request);
    console.log("END MIDDLEWARE");
  };

  const customMidAfter = async (request) => {
    console.log("FROM customMidAfter");
    // console.log(request);
    console.log("END MIDDLEWARE");
  };

  const customMidOnError = async (request) => {
    console.log("FROM customMidOnError");
    console.log(request);
    console.log("END MIDDLEWARE");
  };

  return {
    // Having descriptive function names will allow for easier tracking of perormance bottlenecks using @middy/core/profiler
    before: customMidBefore,
    after: customMidAfter,
    onError: customMidOnError,
  };
};
