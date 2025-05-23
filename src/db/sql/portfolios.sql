CREATE TABLE IF NOT EXISTS `Portfolios` (
  `id` CHAR(36) PRIMARY KEY,
  `userId` CHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `isPublic` BOOLEAN DEFAULT FALSE,
  `publicUrlId` VARCHAR(255) UNIQUE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` DATETIME,
  FOREIGN KEY (`userId`) REFERENCES `Users`(id)
)
