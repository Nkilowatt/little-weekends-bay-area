CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY NOT NULL,
  source_key TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  setting TEXT NOT NULL,
  start_at TEXT NOT NULL,
  city TEXT NOT NULL,
  distance REAL NOT NULL,
  age TEXT NOT NULL,
  price TEXT NOT NULL,
  reservation TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_name TEXT NOT NULL,
  verified_at TEXT NOT NULL,
  why TEXT NOT NULL,
  notes_json TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  last_seen_at TEXT NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS events_start_at_idx ON events (start_at);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS events_source_active_idx ON events (source_key, active);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS sync_state (
  source_key TEXT PRIMARY KEY NOT NULL,
  status TEXT NOT NULL,
  last_attempt_at TEXT NOT NULL,
  last_success_at TEXT,
  message TEXT,
  event_count INTEGER NOT NULL DEFAULT 0
);
