let cache = {};

const fakeAPICall = async (userId) => {
  if (userId in cache) {
    return Promise.resolve(cache[userId]);
  }

  console.log("API call made");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = { userId, name: "John Doe" };
      cache[userId] = response;
      resolve(response);
    }, 100);
  });
};

const cache2: Record<
  string,
  {
    status: "pending" | "success" | "error";
    value: any;
  }
> = {};
const fakeAPICall2 = async (userId) => {
  if (userId in cache2) {
    return Promise.resolve(cache2[userId].value);
  }

  console.log("fakeAPICall2");
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = { userId, name: "John Doe" };
      cache[userId] = { status: "success", value: response };
      resolve(response);
    }, 100);
  });
  cache2[userId] = {
    status: "pending",
    value: p,
  };
};

// Promise.all([fakeAPICall(1), fakeAPICall(1), fakeAPICall(1)]).then(console.log);
Promise.all([fakeAPICall2(1), fakeAPICall2(1), fakeAPICall2(1)]).then(
  console.log
);
