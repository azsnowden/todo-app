create table users(
    id serial primary key,
    displayname varchar(20) not null,
    username varchar(50) not null
);

create table todos(
    id serial primary key,
    priority integer not null,
    todos varchar(100),
    status boolean default false,
    user_id integer references users(id)
);
