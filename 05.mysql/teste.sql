CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    idade INT
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Levy Anselmo", "email@provedor.com", 30
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Joseph Climber", "josephclimber@provedor.com", 921
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Cachorro Caramelo", "bomgaroto@omelhor.com", 5
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Diz Graça", "vailogo@seila.com", 100
);

DELETE FROM usuarios WHERE nome = "Diz Graça";

UPDATE usuarios SET nome = "Nome de Teste" WHERE idade > 100;