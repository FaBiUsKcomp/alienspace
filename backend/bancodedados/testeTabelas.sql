--Inserindo dados

INSERT INTO USUARIO (nome, email, senha)
VALUES ('Sandy', 'sandyw@gmail.com', 'mpg12345');

--Listando dados

SELECT * FROM USUARIO;

--Atualizando dados

UPDATE USUARIO SET senha = 'fabiuskcomp' WHERE email = 'fabio.oliveira2@estudante.ufla.br';

--Deletando dados

DELETE  FROM `TRANSACAO`

DROP TABLE TAREFA

alter table TRANSACAO 
modify valor decimal(8,2)

SELECT * FROM TRANSACAO