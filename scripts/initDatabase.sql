-- User
create table user(
userid integer primary key,
username char(20) unique not null,
password char(20) not null,
phonenumber char(10),
emailaddress char(50) unique
);

-- Payment Information
create table paymentinformationown(
userid integer not null,
creditcardnumber char(16) primary key,
billingaddress char(30),
expirydate date,
cvcode char(3),
foreign key(userid) references user (userid)
on delete cascade
on update cascade
);

-- Current Session
create table currentsession(
sessionid char(15) primary key,
timestamp integer not null
);

-- Creating a list
create table listcreate(
listid char(10) primary key,
userid integer not null,
listname char(20),
foreign key (userid) references user (userid)
on delete cascade
on update cascade
);

-- Report Create
create table reportcreate(
reportid char(15) primary key,
userid integer not null,
status char(10) default ‘pending’ not null,
decision char(10),
date date,
reason char(50),
foreign key (userid) references user (userid)
on delete cascade
on update cascade
);

-- Platform Admin
create table platformadmin (
adminid char(15) primary key,
reportcount integer,
name char(15),
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

-- Watch
create table watch (
userid integer,
videoid integer,
sessionid char(15),
primary key(userid, videoid, sessionid),
foreign key(userid) references user(userid),
on delete cascade
on update cascade,
foreign key(videoid) references video(videoid)
on delete cascade
on update cascade,
foreign key(sessionid) references session(sessionid)
on delete cascade
on update cascade
);

-- Video Upload
create table videoupload(
videoid char(20) primary key,
userid integer,
videoname char(30),
videolength integer,
videogenre char(15),
foreign key(user id) references user (userid)
on delete set null
on update cascade
);


create table contain (
videoid integer,
adid char(15),
primary key(videoid, adid),
foreign key(videoid) references video(videoid)
on delete cascade
on update cascade,
foreignkey(adid) references advertisementprovide(adid)
on delete cascade
on update cascade
);

create table advertisementprovide (
adid char(15),
companyid integer,
adlength,
primary key(adid, companyid),
foreign key(companyid) references company(companyid)
on delete cascade
on update cascade
);