-- MySQL Script generated by MySQL Workbench
-- Wed Nov  9 10:36:07 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `PhoneNumber` VARCHAR(45) NOT NULL,
  `EmailAdress` VARCHAR(45) NOT NULL,
  `Balance` INT NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `emailAdress_UNIQUE` (`EmailAdress` ASC) VISIBLE,
  UNIQUE INDEX `PhoneNumber_UNIQUE` (`PhoneNumber` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Bikes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Bikes` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Bikes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Position` VARCHAR(45) NULL,
  `Battery` INT NULL,
  `Status` TINYINT NULL,
  `Speed` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Stations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Stations` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Stations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `City` VARCHAR(45) NOT NULL,
  `Position` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Chargers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Chargers` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Chargers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Stations_id` INT NOT NULL,
  `Status` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Chargers_Stations_idx` (`Stations_id` ASC) VISIBLE,
  CONSTRAINT `fk_Chargers_Stations`
    FOREIGN KEY (`Stations_id`)
    REFERENCES `mydb`.`Stations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Admins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Admins` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Admins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `PhoneNumber` VARCHAR(45) NOT NULL,
  `EmailAdress` VARCHAR(45) NOT NULL,
  `Authority` TINYINT NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `EmailAdress_UNIQUE` (`EmailAdress` ASC) VISIBLE,
  UNIQUE INDEX `PhoneNumber_UNIQUE` (`PhoneNumber` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Rents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Rents` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Rents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Users_id` INT NOT NULL,
  `Start` VARCHAR(45) NOT NULL,
  `Destination` VARCHAR(45) NULL,
  `StartTimestamp` TIMESTAMP NULL,
  `DestinationTimestamp` TIMESTAMP NULL,
  `Price` SMALLINT NULL,
  `Status` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Rents_Users1_idx` (`Users_id` ASC) VISIBLE,
  CONSTRAINT `fk_Rents_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Invoices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Invoices` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Invoices` (
  `id` INT NOT NULL,
  `Users_id` INT NOT NULL,
  `Amount` SMALLINT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `Status` TINYINT NULL,
  `Rents_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Transactions_Users1_idx` (`Users_id` ASC) VISIBLE,
  INDEX `fk_Transactions_Rents1_idx` (`Rents_id` ASC) VISIBLE,
  CONSTRAINT `fk_Transactions_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transactions_Rents1`
    FOREIGN KEY (`Rents_id`)
    REFERENCES `mydb`.`Rents` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`UsersLog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`UsersLog` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`UsersLog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Users_id` INT NOT NULL,
  `Event` VARCHAR(45) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `Info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_UsersLog_Users1_idx` (`Users_id` ASC) VISIBLE,
  CONSTRAINT `fk_UsersLog_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`AdminsLog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`AdminsLog` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`AdminsLog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Admins_id` INT NOT NULL,
  `Event` VARCHAR(45) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_AdminsLog_Admins1_idx` (`Admins_id` ASC) VISIBLE,
  CONSTRAINT `fk_AdminsLog_Admins1`
    FOREIGN KEY (`Admins_id`)
    REFERENCES `mydb`.`Admins` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`ChargersLog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ChargersLog` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`ChargersLog` (
  `id` INT NOT NULL,
  `Chargers_id` INT NOT NULL,
  `Event` VARCHAR(45) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `Info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ChargersLog_Chargers1_idx` (`Chargers_id` ASC) VISIBLE,
  CONSTRAINT `fk_ChargersLog_Chargers1`
    FOREIGN KEY (`Chargers_id`)
    REFERENCES `mydb`.`Chargers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`RentsLog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`RentsLog` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`RentsLog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Rents_id` INT NOT NULL,
  `Event` VARCHAR(45) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `Info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_RentsLog_Rents1_idx` (`Rents_id` ASC) VISIBLE,
  CONSTRAINT `fk_RentsLog_Rents1`
    FOREIGN KEY (`Rents_id`)
    REFERENCES `mydb`.`Rents` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`InvoicesLog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`InvoicesLog` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`InvoicesLog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Transactions_id` INT NOT NULL,
  `Event` VARCHAR(45) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `Info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_TransactionsLog_Transactions1_idx` (`Transactions_id` ASC) VISIBLE,
  CONSTRAINT `fk_TransactionsLog_Transactions1`
    FOREIGN KEY (`Transactions_id`)
    REFERENCES `mydb`.`Invoices` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`StationsLog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`StationsLog` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`StationsLog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Stations_id` INT NOT NULL,
  `Event` VARCHAR(45) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `Info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_StationsLog_Stations1_idx` (`Stations_id` ASC) VISIBLE,
  CONSTRAINT `fk_StationsLog_Stations1`
    FOREIGN KEY (`Stations_id`)
    REFERENCES `mydb`.`Stations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`BikesLog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`BikesLog` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`BikesLog` (
  `id` INT NOT NULL,
  `Bikes_id` INT NOT NULL,
  `Event` VARCHAR(45) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `Info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_BikesLog_Bikes1_idx` (`Bikes_id` ASC) VISIBLE,
  CONSTRAINT `fk_BikesLog_Bikes1`
    FOREIGN KEY (`Bikes_id`)
    REFERENCES `mydb`.`Bikes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Geofences`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Geofences` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Geofences` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Coordinates` VARCHAR(45) NOT NULL,
  `Info` VARCHAR(45) NULL,
  `Type` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`GeofencesLog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`GeofencesLog` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`GeofencesLog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Geofences_id` INT NOT NULL,
  `Event` VARCHAR(45) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `Info` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_GeofencesLog_Geofences1_idx` (`Geofences_id` ASC) VISIBLE,
  CONSTRAINT `fk_GeofencesLog_Geofences1`
    FOREIGN KEY (`Geofences_id`)
    REFERENCES `mydb`.`Geofences` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- -----------------------------------------------------
-- -                 PROCEDURES                        -
-- -----------------------------------------------------
-- -----------------------------------------------------

--
-- Procedure to insert into log
--
DROP PROCEDURE IF EXISTS insert_UsersLog;
DELIMITER ;;
CREATE PROCEDURE insert_UsersLog(
    a_Users_id INT,
    a_Event VARCHAR(45),
    a_Info VARCHAR(45)
    )
    BEGIN
		INSERT INTO UsersLog (Users_id, Event, Timestamp, Info)
        VALUES (a_Users_id, a_Event, CURRENT_TIMESTAMP(), a_Info);
	END
    ;;
DELIMITER ;

-- --
-- -- Procedure to fetch categories
-- --
-- DROP PROCEDURE IF EXISTS show_prodcat;
-- DELIMITER ;;
-- CREATE PROCEDURE show_prodcat()
-- 	BEGIN
-- 		SELECT * FROM prodcat;
-- 	END
-- ;;
-- DELIMITER ;

-- -----------------------------------------------------
-- -----------------------------------------------------
-- -                 TRIGGERS                          -
-- -----------------------------------------------------
-- -----------------------------------------------------

--
-- Trigger to update log with product insert events
--
DROP TRIGGER IF EXISTS UsersLog_Insert;

CREATE TRIGGER UsersLog_Insert
AFTER INSERT
ON Users FOR EACH ROW
	CALL insert_UsersLog(NEW.id, "created", "New user created");

