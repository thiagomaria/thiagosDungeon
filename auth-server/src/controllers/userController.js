const bcrypt = require('bcryptjs');
const { createUser } = require('../repositories/userRepository');

async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({ username, email, password: hashedPassword });

        return res.status(201).json({
            message: 'Usuário criado com sucesso!',
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (err) {
        if (err.code === 'DUPLICATE') {
            return res.status(409).json({ error: err.message });
        }
        return next(err);
    }
}

module.exports = { register };
