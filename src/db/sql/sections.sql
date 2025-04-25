CREATE TABLE IF NOT EXISTS `Sections` (
  `id` CHAR(36) PRIMARY KEY,
  `portfolioId` CHAR(36) NOT NULL,
  `type` ENUM('home','uxui','webRedesign','detailpage') NOT NULL,
  `content` JSON,
  `sortOrder` INT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (portfolioId) REFERENCES Portfolios(id) ON DELETE CASCADE
  )
