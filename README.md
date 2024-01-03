# Medivic

Projeto desenvolvido para a disciplina Projeto Prático do curso técnico de Desenvolvimento de Sistemas do CEFET campus Timoteo, no ano de 2023, orientado pela pela professora Márcia. O projeto conta com uma documentação que aborda minimundo, materiais de referência, diagramas, protótipo de interface e entre outros tópicos importantes para o planejamento do desenvolvimento de um sistema.

## Resumo da Aplicação:

O Medivic é um sistema móvel projetado para agendar e enviar alertas sobre a ingestão de medicamentos. Os usuários podem cadastrar seus remédios no aplicativo, incluindo informações como nome, descrição, dosagem, unidade de medida, horário, quantidade de dias, intervalo de tempo e data inicial. O sistema confirma a leitura do aviso em cada alarme para acompanhar a adesão ao tratamento. Em caso de atraso na tomada do medicamento, o aplicativo permite o adiamento em minutos pré-determinados, atualizando os registros correspondentes.

Os usuários têm a opção de criar uma conta pessoal, inserindo dados como nome, telefone e senha, e também podem gerenciar os medicamentos de um dependente. Para isso, é necessário criar um perfil para o dependente na conta do usuário principal, permitindo o acompanhamento detalhado da medicação, horários e conformidade. Senhas aleatórias são geradas para os dependentes, que podem ser usadas para acessar uma conta restrita apenas à visualização dos medicamentos e recebimento de alarmes.

Além disso, os usuários podem cancelar lembretes e agendamentos, editar informações sobre suas medicações e as dos dependentes, e até mesmo transformar um dependente em um usuário autônomo comum, criando uma conta padrão para eles. A flexibilidade do sistema permite que os usuários controlem suas informações e lembretes de acordo com suas necessidades e preferências.

## Documentação do Aplicativo:
Versão Final - [Documentação - Medivic..pdf](https://github.com/adryanmbdk/medivic/files/13468682/Documentacao.-.Medivic.pdf) (23/11/2023)

Versão Inicial - [Documentação Sucinta do Sistema_PP-Adryan-Caldeira-2023 .docx.pdf](https://github.com/adryanmbdk/medivic/files/13468683/Documentacao.Sucinta.do.Sistema_PP-Adryan-Caldeira-2023.docx.pdf) (26/04/2023)

## Como executar o projeto?

### É necessário ter alguns componentes instalados em sua máquina:
- **Node.JS:**
  - Pode ser instalado por este link: https://nodejs.org/en
  - Deve-se executar o comando `npm install` no CMD/terminal do computador.
- **Ionic:**
  - Após instalar o node, basta apenas executar o comando `npm install -g @ionic/cli` no CMD/terminal do computador.
  - Para mais informações: https://ionicframework.com/docs/intro/cli
- **Angular:**
  - Após instalar o node, basta apenas executar o comando `npm install -g @angular/cli` no CMD/terminal do computador.
  - Para mais informações: https://angular.io/guide/setup-local
- **XAMPP:**
  - Para instalar o XAMPP, acesse o site: https://www.apachefriends.org/pt_br/index.html
- **MySQL Workbench:**
  - Para instalar o MySQL Workbench, acesse o site: https://dev.mysql.com/downloads/workbench/
- **Java:**
  - Ter o Java 17 ou superior instalado: https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html

### Execute o XAMPP e dê start no "Apache" e no "MySQL".
![image](https://github.com/adryanmbdk/medivic/assets/95255315/cb87be83-3671-45a4-8cc2-3900b0b51915)

### Abra a pasta "Medivic" dentro da pasta "medivic" com o terminal. 
![image](https://github.com/adryanmbdk/medivic/assets/95255315/ef0498f8-ac26-4864-8877-6bd654ced615)

### Digite "ionic serve". Caso peça para baixar algum componente, baixe.
![image](https://github.com/adryanmbdk/medivic/assets/95255315/8dcd94ae-4460-48ca-870c-448d378c3337)

### Abra o arquivo "medivicbd.sql" com o MySQL Workbench e, primeiro, delete as três linhas que estão destacadas e então crie o banco de dados clicando no ícone de raio destacado na imagem. 
![image](https://github.com/adryanmbdk/medivic/assets/95255315/6ca31734-959d-43f9-89f4-cddda697f29f)

