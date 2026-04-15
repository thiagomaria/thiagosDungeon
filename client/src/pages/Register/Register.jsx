import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/api';
import styles from './Register.module.css';

const INITIAL_FORM = { username: '', email: '', password: '' };

export default function Register() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    function handleChange(event) {
        const { name, value } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setFeedback(null);

        try {
            const result = await registerUser(form);
            setFeedback({
                type: 'success',
                text: `Bem-vindo à dungeon, ${result.user.username}!`
            });
            setForm(INITIAL_FORM);
        } catch (err) {
            setFeedback({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Criar Conta</h1>

                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Nome de Aventureiro</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Seu nome na dungeon"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Mínimo 6 caracteres"
                            minLength={6}
                            required
                        />
                    </div>

                    {feedback && (
                        <div className={`${styles.feedback} ${styles[feedback.type]}`}>
                            {feedback.text}
                        </div>
                    )}

                    <button type="submit" className={styles.btnSubmit} disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrar'}
                    </button>
                </form>

                <Link to="/" className={styles.backLink}>← Voltar para a home</Link>
            </div>
        </main>
    );
}
