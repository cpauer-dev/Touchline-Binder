# Touchline v0.6.1

Touchline is a local-first Progressive Web App for youth soccer coaches.

> **Touchline is a coaching assistant, not a coaching replacement.**

## This correction release includes

- Restored and expanded contact information by merging prior roster data with recent team email information
- Roster completeness based on at least one parent/guardian having a full name, phone, and email
- General team-warning panel for duplicate jerseys, missing jerseys, incomplete contacts, and roster inconsistencies
- 25 editable default drills: five in each core training category
- Saved-practice opening correction
- Desktop drag-and-drop plus touch reorder and visible up/down controls
- Stable live timers that no longer dismiss the mobile keyboard every second
- Persistent active Practice/Game session and resume behavior
- Incomplete practice and game AARs counted on the dashboard
- Faster pregame availability table with Yes, No, and Unknown columns
- Team Staff selection from existing team adults
- Editable permission checkboxes prefilled by role template

## Update notes

Upload all files from this release to the same GitHub Pages location. Keep the folder structure intact.

The service-worker cache changed in this release. After uploading:
1. Open the GitHub Pages site in Chrome and refresh it.
2. Fully close the installed Touchline PWA.
3. Reopen it.

Existing v0.6 data is migrated when available. Export a JSON backup before major browser or hosting changes.
