const express = require('express');
const oracledb = require('oracledb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

// Configurações do servidor e banco de dados
const port = process.env.PORT || 3000;

async function initialize() {
  try {
    await oracledb.createPool({
      user: 'rm95962',
      password: '261102',
      connectString: 'oracle.fiap.com.br:1521/ORCL',
    });
    console.log('Conexão bem-sucedida com o Oracle Database.');
  } catch (error) {
    console.error('Erro na conexão com o Oracle Database:', error);
  }
}

initialize();

app.use(express.json());

// Defina os modelos do Oracle para usuário
const User = oracledb.model('User', {
  username: String,
  password: String,
});

// Rotas de autenticação e CRUD
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado.' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: 'Credenciais inválidas.' });
      return;
    }

    const token = jwt.sign({ username: user.username }, 'secretpassword', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
