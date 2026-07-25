# Changelog

## v0.6.1

### Dashboard
- Removed drill count.
- Retained AARs Due.
- Added broad roster and data inconsistency warnings.
- Tightened roster completeness to require one complete parent/guardian record.

### Contacts
- Merged prior roster information with recent email information instead of replacing records.
- Added second guardians where recovered.
- Added complete Bill Cartier and Kate Roden contact information.

### Drill Library
- Expanded defaults to 25 drills, five per core category.
- All defaults remain editable and deletable.

### Practice Builder
- Corrected saved-practice opening.
- Added mobile touch reordering and explicit up/down controls.
- Retained tap-to-add and desktop drag-and-drop.

### Live Modes
- Timer ticks now update only timer elements rather than rerendering the whole screen.
- Typing notes no longer loses focus each second.
- Active practices and games can be resumed after navigation.
- Starting the same active game resumes it instead of resetting it.

### Attendance and AARs
- Replaced pregame dropdowns with a Yes / No / Unknown table.
- Ending a practice or game creates an incomplete AAR.
- Incomplete AARs appear in AARs Due until marked complete.

### Staff
- Staff may be selected from team adults or entered manually.
- Role templates prefill editable permission checkboxes.
- Staff cards show permission summaries.

### Known limitations
- Local-only storage remains device/browser specific.
- Cloud invitations, QR team membership, and enforceable multi-user permissions are not yet implemented.
- Native voice transcription remains deferred.
