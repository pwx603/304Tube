-- User
create table users (
userid serial primary key,
username varchar(20) unique not null,
password varchar(20) not null,
phonenumber char(10),
emailaddress varchar(50) unique
);

-- Payment Information
create table paymentinformationown (
userid serial not null,
creditcardnumber char(16) primary key,
billingaddress char(30),
expirydate date,
cvcode char(3),
foreign key(userid) references users (userid)
on delete cascade
on update cascade
);

-- Current Session
create table currentsession (
sessionid char(15) primary key,
timestampid integer not null
);

-- Creating a list
create table listcreate (
listid char(10) primary key,
userid serial not null,
listname char(20),
foreign key (userid) references users (userid)
on delete cascade
on update cascade
);

-- Report Create
create table reportcreate (
reportid char(15) primary key,
userid serial not null,
status char(10) not null default "pending",
decision char(10),
reportdate date,
reason char(50),
foreign key (userid) references users (userid)
on delete cascade
on update cascade
);

-- Platform Admin
create table platformadmin (
adminid char(15) primary key,
reportcount integer,
name char(15)
);

-- Company
create table company (
companyid integer primary key,
companyname char(20)
);

-- Report Review
create table reportreview (
reportid char(15) not null unique,
adminid char(15),
primary key(reportid, adminid),
foreign key(adminid) references platformadmin (adminid),
foreign key(reportid) references reportcreate(reportid)
);


-- Video Upload
create table videoupload (
videoid char(20) primary key,
userid serial,
videoname char(30),
videolength integer,
videogenre char(15),
foreign key(userid) references users (userid)
on delete set null
on update cascade
);

-- Watch
create table watch (
userid serial,
videoid char(20),
sessionid char(15),
primary key(userid, videoid, sessionid),
foreign key(userid) references users(userid)
on delete cascade
on update cascade,
foreign key(videoid) references videoupload(videoid)
on delete cascade
on update cascade,
foreign key(sessionid) references currentsession(sessionid)
on delete cascade
on update cascade
);

-- Advertisementprovide
create table advertisementprovide (
adid char(15) unique,
companyid integer,
adlength integer,
primary key(adid, companyid),
foreign key(companyid) references company(companyid)
on delete cascade
on update cascade
);

-- Contain
create table contain (
videoid char(20),
adid char(15) unique,
companyid integer,
primary key(videoid, adid),
foreign key(videoid) references videoupload(videoid)
on delete cascade
on update cascade,
foreign key(adid, companyid) references advertisementprovide(adid, companyid)
on delete cascade
on update cascade
);

