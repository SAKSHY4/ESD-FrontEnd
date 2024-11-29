export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
  
    const data = await response.text();
    return data; // Return the token
  };
  