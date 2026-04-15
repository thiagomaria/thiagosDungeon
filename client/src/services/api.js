const API_BASE = '/api';

export async function registerUser({ username, email, password }) {
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Erro ao registrar usuário.');
    }

    return data;
}
