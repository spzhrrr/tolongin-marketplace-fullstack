-- AlterTable: category service type (DIGITAL | PHYSICAL)
ALTER TABLE `categories` ADD COLUMN `serviceType` VARCHAR(191) NOT NULL DEFAULT 'DIGITAL';

-- AlterTable: service location for on-site offerings
ALTER TABLE `services` ADD COLUMN `location` VARCHAR(191) NULL;
ALTER TABLE `services` ADD COLUMN `isRemote` BOOLEAN NOT NULL DEFAULT true;

-- Backfill existing categories
UPDATE `categories` SET `serviceType` = 'PHYSICAL' WHERE `slug` IN (
  'les-privat',
  'service-reparasi',
  'pindahan'
);

-- Backfill existing services from category type
UPDATE `services` s
INNER JOIN `categories` c ON s.`categoryId` = c.`id`
SET
  s.`isRemote` = IF(c.`serviceType` = 'DIGITAL', true, false),
  s.`location` = IF(
    c.`serviceType` = 'DIGITAL',
    'Remote',
    COALESCE(
      (SELECT u.`city` FROM `users` u WHERE u.`id` = s.`sellerId`),
      'Indonesia'
    )
  );
