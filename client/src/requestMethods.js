import axios from "axios";

const BASE_URL = "http://localhost:3001/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTdjNTkyN2Q0YWM5ZmE5NGQ0NGJlOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MzAzNzMxMiwiZXhwIjoxNjczMjk2NTEyfQ.Ob4qF7eBX-7vzM_8RJ0q4Sli1xqz8hmzTkx-5bH7Rkk";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {token: `Bearer ${TOKEN}`}
});
