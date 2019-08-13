create table todos(
    id serial primary key,
    priority integer not null,
    todos varchar(100),
    status boolean default false
);