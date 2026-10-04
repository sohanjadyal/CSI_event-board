Closes #

## What I changed


## How it works
<!-- In your own words: why does this change fix the problem or add the feature? At least a couple of sentences. -->

Closes #Earliest date first

## What I changed

I fixed the event ordering so that events are displayed in chronological order, with the earliest date shown first.

## How it works

The events are sorted by their date value before being returned by the GET /events endpoint. Since event dates are stored in `YYYY-MM-DD format`, `localeCompare()` can be used to compare the date strings and arrange them from earliest to latest. I sort a copy of the events array so that the original array is not modified.