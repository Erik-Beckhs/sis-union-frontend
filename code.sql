create database union;

create table cliente (
	id int AUTO_INCREMENT primary key,
    nombre varchar(50) not null,
    paterno varchar(100) not null,
    materno varchar(100) not null,
    tipo_doc int(1) not null,
    doc_identidad varchar(100) not null,
    fecha_nac date not null,
    genero int(1)
);

create table cuenta (
	id int AUTO_INCREMENT primary key,
    id_cliente int not null,
    tipo_prod int(1),
    num_cuenta varchar(50) not null,
    moneda char(2) not null,
    monto decimal(10,2),
    fecha_creacion date not null,
    sucursal int(1) not null,
    constraint fk_ic foreign key (id_cliente) references cliente (id) on delete cascade on update cascade
);

-- datos para cliente
insert into cliente(nombre, paterno, materno, tipo_doc, doc_identidad, fecha_nac, genero)
values ('Erik', 'Maquera', 'Cañasto', 1, '8286974', '1991/10/06', 1),
('Rosario', 'Quispe', 'Alanoca', 1, '10093622', '1996/01/05', 0)

-- datos para sus cuentas
insert into cuenta(id_cliente, tipo_prod, num_cuenta, moneda, monto, fecha_creacion, sucursal)
values(1, 1, '10000010563225', 'BS', 10000, '2022/04/05', 1),
(1, 2, '10000010885412', 'US', 15000, '2022/04/06', 1),
(2, 1, '10000020523652', 'BS', 18000, '2022/04/07', 2)