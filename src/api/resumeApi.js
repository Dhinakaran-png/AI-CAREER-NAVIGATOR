import axios from "axios";

const API_URL = "http://localhost:5000/api/resume";

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getResume = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};