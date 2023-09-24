DROP SCHEMA IF EXISTS medivic;
CREATE SCHEMA IF NOT EXISTS medivic;

USE medivic;

CREATE TABLE IF NOT EXISTS usuario (
    idUsuario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    email VARCHAR(45) NOT NULL,
    PRIMARY KEY (idUsuario)
);

CREATE TABLE IF NOT EXISTS remedio (
  idRemedio INT NOT NULL AUTO_INCREMENT,
  idUsuario  INT NOT NULL,
  nome  VARCHAR(60) NOT NULL,
  descricao  VARCHAR(300) NOT NULL,
  unidade  VARCHAR(30) NOT NULL,
  quantDias INT NOT NULL,
  intervalo INT NOT NULL,
  dosagem INT NOT NULL,
  dtInicio VARCHAR(20) NOT NULL,
  horarioNovo VARCHAR(20) NOT NULL,
  horarioInicio VARCHAR(20) NOT NULL,
  vezes INT NOT NULL,
  PRIMARY KEY (idRemedio)
  #CONSTRAINT FK_idUsuario FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
  );
  
  CREATE TABLE IF NOT EXISTS horario (
  idHorario INT NOT NULL AUTO_INCREMENT,
  data VARCHAR(10) NOT NULL,
  hora VARCHAR(10) NOT NULL,
  idRemedio INT NOT NULL,
  PRIMARY KEY (idHorario)
  #CONSTRAINT FK_idRemedio FOREIGN KEY (idRemedio) REFERENCES remedio(idRemedio)
  );
  
  CREATE TABLE IF NOT EXISTS usuarioAdmin (
  idCuidador INT NOT NULL,
  idDependente INT NOT NULL,
  tipo CHAR(1) NOT NULL COMMENT 'A=Administrador;C=Cuidador',
  administrarRemedio INT NOT NULL,
  cadastrarRemedio INT NOT NULL,
  PRIMARY KEY (idCuidador, idDependente),
  CONSTRAINT fk_usuario_admin_Usuario1 FOREIGN KEY (idCuidador) REFERENCES usuario(idUsuario),
  CONSTRAINT fk_usuario_admin_Usuario2 FOREIGN KEY (idDependente) REFERENCES usuario(idUsuario)
  );