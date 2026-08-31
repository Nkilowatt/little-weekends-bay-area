ALTER TABLE `events` ADD COLUMN `place_key` text DEFAULT '' NOT NULL;
--> statement-breakpoint
CREATE INDEX `events_place_key_idx` ON `events` (`place_key`);
--> statement-breakpoint
CREATE TABLE `place_photo_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`place_key` text NOT NULL,
	`place_name` text NOT NULL,
	`object_key` text,
	`status` text NOT NULL CHECK (`status` IN ('pending', 'approved', 'rejected', 'withdrawn', 'expired')),
	`content_type` text NOT NULL,
	`byte_size` integer NOT NULL,
	`taken_on` text,
	`device_hash` text NOT NULL,
	`manage_token_hash` text NOT NULL,
	`consent_version` text NOT NULL,
	`consent_at` text NOT NULL,
	`created_at` text NOT NULL,
	`reviewed_at` text,
	`reviewer_user_id` text,
	`rejection_reason` text,
	`is_featured` integer DEFAULT false NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `place_photo_submissions_request_id_unique` ON `place_photo_submissions` (`request_id`);
--> statement-breakpoint
CREATE INDEX `place_photo_submissions_status_created_idx` ON `place_photo_submissions` (`status`,`created_at`);
--> statement-breakpoint
CREATE INDEX `place_photo_submissions_place_status_featured_idx` ON `place_photo_submissions` (`place_key`,`status`,`is_featured`,`reviewed_at`);
--> statement-breakpoint
CREATE INDEX `place_photo_submissions_device_created_idx` ON `place_photo_submissions` (`device_hash`,`created_at`);
