insert into users
(displayname, username)
values
('alice','m3gahaxxxxxx'),
('bob', 'blitznarg');



insert into todos (priority, todos,user_id) 
values
    (1,'feed the dog',1),
    (2, 'pet the dog',1),
    (3, 'fight neighborhood cat',1),
    (4, 'sleep',1),
    (1,'feed the cat',2),
    (2, 'pet the cat',2),
    (3, 'fight neighborhood dog',2),
    (4, 'sleep',2),
    (5, 'watch tv,',2);
;

select * from users;