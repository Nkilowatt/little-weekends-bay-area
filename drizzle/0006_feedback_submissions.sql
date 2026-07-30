CREATE TABLE IF NOT EXISTS `feedback_submissions` (
  `id` text PRIMARY KEY NOT NULL,
  `request_id` text NOT NULL UNIQUE,
  `category` text NOT NULL,
  `message` text NOT NULL,
  `email` text,
  `context_json` text DEFAULT '{}' NOT NULL,
  `status` text DEFAULT 'new' NOT NULL,
  `created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `feedback_submissions_status_created_idx`
  ON `feedback_submissions` (`status`, `created_at` DESC);
