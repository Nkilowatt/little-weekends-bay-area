CREATE TABLE IF NOT EXISTS `place_image_sources` (
	`place_key` text PRIMARY KEY NOT NULL,
	`google_place_id` text,
	`match_status` text NOT NULL,
	`matched_name` text,
	`matched_address` text,
	`matched_latitude` real,
	`matched_longitude` real,
	`distance_meters` real,
	`checked_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `place_image_sources_status_idx`
ON `place_image_sources` (`match_status`, `checked_at`);
