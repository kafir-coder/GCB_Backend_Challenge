### Bom dia Candidato,
### Tudo bem?
### Para darmos continuidade em seu processo seletivo, pedimos que você realize o seguinte teste:
### Desenvolver um sistema que faça a gestão de cadastros de médicos. O Sistema deve suportar as seguintes operações:
- Insert
- Update
- Select
- Soft Delete
### No cadastro do médico, devem ser cadastrados os seguintes itens:
- Nome do médico com no máximo 120 caractéres
- CRM: somente números com no máximo 7 caracteres
- Telefone fixo: somente números
- Telefone celular: somente números
- CEP: somente números (Ao cadastrar o CEP, deve ser feita uma reqisição via XHR para a API dos - - correios e retornar todos os dados de endereço do cliente).
- Especialidade médica (mínimo de duas especialidades)
### Itens importantes:
- Estar no padrão REST
- Criar mecanismo de busca por todos os campos do cadastro do médico, incluindo o endereço
- Utilizar ferramenta de validação (exemplo: YUP)
- Funções especialistas (Realizam somente uma operação)
- Para documentação e requisição utilizar o Postman, Insomnia ou Swagger (Enviar junto com o -teste o workspace utilizado)
- Subir o código em repositório público do GitHub
- Criar arquivo docker compose para avaliação do teste (ATENÇÃO: Sem esse arquivo seu teste não     será executado)
- Testes unitários
- Testes "end to end"
### Diferenciais:
- Estrutura e implementação autênticos
- Testes de integração
- AWS (ECS, RDS)
- Estruturação de banco de dados MySQL
- Conhecimento em NoSQL
- Metodologias ágeis
- Filas (RabbitMQ ou SQS)
### Ferramentas para serem utilizadas no desenvolvimento (Escolha entre as duas linguagens citadas abaixo):
Node.JS (Seguir as seguintes orientações)
- NestJS
- TypeScript
- Sequelize ou TypeORM
- Migrations e Seeds
Java (Seguir as seguintes orientações)
- SpringBoot
- Hibernate
PHP (Seguir as seguintes orientações)
- CodeIgniter

### No banco de dados devem estar cadastradas as seguintes especialidades:
- Alergologia
- Angiologia
- Buco maxilo
- Cardiologia clínca
- Cardiologia infantil
- Cirurgia cabeça e pescoço
- Cirurgia cardíaca
- Cirurgia de tórax
