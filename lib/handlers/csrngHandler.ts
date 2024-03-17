const csrngHandler = async (): Promise<number> => {
  const url = "https://csrng.net/csrng/csrng.php?min=0&max=100";
  const response = await fetch(url);
  const [body] = await response.json();
  if (body.status === "success") {
    return body.random;
  } else {
    return Promise.reject(new Error(body));
  }
};

export default csrngHandler;
