---
id: action-time
title: ActionTime
tags: [action-time, schema]
---
# ActionTime
Currently, we use [Joda Time](https://www.joda.org/joda-time/) for the [ActionTime](schema.md#actiontime) field. To use other format for time, developers may look into the following classes.
* [DateBase](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/util/converter/DateBase.java): specifies the pattern of time.
* [DayIntConverter](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/util/converter/DayIntConverter.java): converts a time in the pattern described in DateBase to an integer.
* [TimeUnits](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/cohort/TimeUnit.java): units used for age calculation in cohort analysis. Day is used by default.
* [TimeUtils](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/cohort/TimeUtils.java): utility functions to process time and age.
