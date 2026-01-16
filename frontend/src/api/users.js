import api from "./client";

export async function createUser(payload) {
  try {
    const response = await api.post("/users", payload);
    return response.data;
  } catch (error) {
    // Log the full error for debugging
    console.error("API Error:", error.response?.data || error.message);
    
    // Throw a more user-friendly error
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
}