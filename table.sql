create table Towns (
    id serial not null primary key,
    starts_with varchar not null,
    Town text not null
);

create table Registrations (
    reg_num text not null,
    loc_indicator int,
     foreign key (loc_indicator) references Towns(id)
);

INSERT INTO Towns(starts_with, Town) VALUES('CA', 'Cape Town');
INSERT INTO Towns(starts_with, Town) VALUES('CJ', 'Paarl');
INSERT INTO Towns(starts_with, Town) VALUES('CY', 'Bellvile');