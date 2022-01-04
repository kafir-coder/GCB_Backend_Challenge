create database if not exists GCB_Challenge ;

use GCB_Challenge;

create table especialidade(
    id int(11) not null auto_increment,
    nome varchar(60),
    primary key(id)
);

insert into especialidade values (NULL, "Alergologia");
insert into especialidade values (NULL,"Angiologia");
insert into especialidade values (NULL,"Buco maxilo");
insert into especialidade values (NULL, "Cardiologia clínca");
insert into especialidade values (NULL, "Cardiologia infantil");
insert into especialidade values (NULL, "Cirurgia cabeça e pescoço");
insert into especialidade values (NULL, "Cirurgia cardíaca");
insert into especialidade values (NULL, "Cirurgia de tórax");
