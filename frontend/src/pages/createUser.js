
const client = axios.create({ baseURL: "http://localhost:5555/register" });

export const handleRegister = (email, username, password) => {
  client
    .post("http://localhost:5555/register", {
      email,
      username,
      password,
    })
    .then((response) => {
      if (!response.error) {
        alert("User created successfully");
        localStorage.setItem('@token', response.data.token)
        return true

      }
    })
    .catch((e) => {
      if (e.response.data) {
        console.log(e.response.data);
        alert(`${e.response.data.error}`);
        return false
      }
      alert("Error Creating user");
      console.log(response.error);
    });
};
