--CreateTableUser
CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`email`))
ENGINE = InnoDB;

--InsertUser
insert into User (firstName, lastName, email, password) values ('Casa', 'Manioca', 'contact@casamanioca.ca', 'cm123!');
