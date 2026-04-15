const fs = require('fs/promises');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

async function ensureStore() {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
        await fs.access(USERS_FILE);
    } catch {
        await fs.writeFile(USERS_FILE, '[]');
    }
}

async function readUsers() {
    await ensureStore();
    const content = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(content);
}

async function writeUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function createUser({ username, email, password }) {
    const users = await readUsers();

    if (users.some(u => u.email === email)) {
        const err = new Error('Este email já está cadastrado.');
        err.code = 'DUPLICATE';
        throw err;
    }

    if (users.some(u => u.username === username)) {
        const err = new Error('Este nome de usuário já está em uso.');
        err.code = 'DUPLICATE';
        throw err;
    }

    const user = {
        id: Date.now(),
        username,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    users.push(user);
    await writeUsers(users);
    return user;
}

module.exports = { createUser };
