create table Towns (
	id serial not null primary key,
    Town text not null,
	RegNum text not null
);

create table Registrations (
	id serial not null primary key,
    RegNum text not null,
    startswith int not null,
     foreign key (startswith) references Registrations(id)
);

