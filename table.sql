create table Towns (
    starts_with varchar not null primary key,
    Town text not null
);

create table Registrations (
    reg_num text not null,
    loc_indicator varchar,
     foreign key (loc_indicator) references Towns(starts_with)
);

INSERT INTO Towns(starts_with, Town) VALUES('CA', 'Cape Town');
INSERT INTO Towns(starts_with, Town) VALUES('CJ', 'Paarl');
INSERT INTO Towns(starts_with, Town) VALUES('CY', 'Bellvile');