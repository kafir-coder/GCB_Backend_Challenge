### GCB backend Challenge

### documentação da API
#### [here](https://app.swaggerhub.com/apis/kafir-coder/doctor_apo/1.0.0#/default)

### executar testes unitários e de integração
```
npm run test
```
### Instanciar o servidor mysql

```
docker-compose up mysqldb
```

### Criar base de dados e tabelas (tabela especialidades)

```
mysql -hlocalhost -uroot -p  < db.sql // a password é 1234
```

### Instanciar o servidor Web

```
docker-compose up api
```
