ALTER TABLE `place_photo_submissions` ADD COLUMN `retry_token_hash` text DEFAULT '' NOT NULL;
--> statement-breakpoint
CREATE TABLE `place_photo_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`photo_id` text NOT NULL,
	`place_key` text NOT NULL,
	`message` text NOT NULL,
	`email` text,
	`status` text DEFAULT 'new' NOT NULL CHECK (`status` IN ('new', 'resolved', 'dismissed')),
	`created_at` text NOT NULL,
	`resolved_at` text,
	`resolved_by_user_id` text,
	`resolution` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `place_photo_reports_request_id_unique` ON `place_photo_reports` (`request_id`);
--> statement-breakpoint
CREATE INDEX `place_photo_reports_status_created_idx` ON `place_photo_reports` (`status`,`created_at`);
--> statement-breakpoint
CREATE INDEX `place_photo_reports_photo_status_idx` ON `place_photo_reports` (`photo_id`,`status`);
