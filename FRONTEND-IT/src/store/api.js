export const api = async (endpoint, { method = "GET", body, headers = {} } = {}) => {
  try {
    const options = {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...headers },
    };

    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, options);
    const data = await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, data };
  } catch (error) {
    console.error("API wrapper error:", error);
    return { ok: false, status: 0, data: null, error };
  }
};
