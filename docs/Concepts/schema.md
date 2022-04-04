---
id: schema
title: Schema
tags: [schema]
---


# Schema
A table in cool describes a group of users behavior (`actions`) under a certain context (`app`) over a period of time. A user and its actions are assciated with attributes on which we want to classify users or carry out analysis. To aid cohort analysis, fields of a table in COOL is further categorized as follows. 

## AppKey
A higher level grouping of users. Currently, this is not used.

## UserKey
Cohort are built on users. A cohort is a set of userkeys that have records satisfying the criteria listed in query.

## Action
Actions are users behavior from which we build cohort.

## ActionTime
The time associated to each action in the table. ActionTime also describes the age dimension of a user in a cohort for aggregation. Read more about ActionTime [here](action-time.md)

## Metric
Fields that contain numeric values for selecting users or aggregation during cohort analysis

## Segment
Fields that contain non-numeric values for selecting users or aggregation during cohort analysis
