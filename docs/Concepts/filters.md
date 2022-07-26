---
id: filters
title: Filters
tags: [filter]
---
# Filters
Filters process the values stored in the field to filter out records matching the criteria stated in the query. Filters also check the metadata of each field in DataChunk and MetaChunk to skip the loading of chunks or Cublet files entirely if it is certain no matching records are can be found inside. It should be noted that filter will check the UserMetaField when checking the invariant data. There are different filters in COOL that takes different criteria and works on distinct field types.
## SetFieldFilter
SetFieldFilter applies to [AppKey, UserKey, Segment and Action](schema.md#AppKey) fields. The criteria are expressed as a selected set of field values. If it is empty or contains the special string `ALL`, the filter accepts any sets of values.

Behavior:
* A DataChunk or a Cublet is not skipped if the target field contains at least one value in the selected set stated by the filter.
* A value is acceptable if it matches with any inside `values`.

## RangeFieldFilter
RangeFieldFilter applies to [ActionTime and Metric](schema.md#Metric) fields. It takes multiple pairs of min and max values.

Behavior:
* A DataChunk or a Cublet is not skipped if the target field in it has an overlapping range with any one of the ranges the min-max pairs specified.
* A value is acceptable if it falls in any one of the ranges of the min-max pairs specified.

## Extension
Developers are welcome to introduce new filtering behavior by implementing the [FieldFilter](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/cohort/filter/FieldFilter.java) interface. The filter selected for a specified field type is governed by the [FieldFilterFactory](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/cohort/filter/FieldFilterFactory.java).