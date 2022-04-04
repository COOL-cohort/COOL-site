---
id: funnel-query
title: Funnel Query
tags: [query, funnel]
---

# Funnel Query

Funnel analysis is to analyze the sequence of events that result in the conversion.
Hence, funnel analysis allows companies to know how user behaviors affect their business and help company optimize their own conversion funnel.

In funnel analysis, we need to define different different stages with wanted events. For a better illustration, we take an [demo funnel query](https://github.com/COOL-cohort/COOL/blob/versionClean/sogamo/query1.json) as an example to demonstrate how to define funnel stages.

## Step1. Define stages

First, we need to define stages in the funnel analysis. Each stage denotes a sequence of birth events. For example, in this demo funnel query, our first event is to select the users who have triggered a `launch` event at least once on any day.
```json
  "stages": [{
      "birthEvents":[{
          "eventSelection":[
            {
              "cubeField":"event",
              "fieldValue":{
                "baseEvent":-1,
                "baseField":null,
                "type":"AbsoluteValue",
                "values":[
                  "launch"
                ]
              },
              "filterType":"Set"
            }
          ],
          "maxTrigger":-1,
          "minTrigger":1,
          "timeWindow":null
        }
      ]
    },
    {/* highlight-start */}
    ... ...
    {/* highlight-end */}
  ]
```

In this stage list, we need to define multiple `birthEvents` as different stages, and these stages are in time order by default.

## Step 2. Define other related information
At last, we need to complete the cohort query with other related information (e.g., cube name, input cohort, app key, etc)

```json
"appKey": null,
"dataSource":"sogamo",
"inputCohort":null
```

The definitions of these parameters are listed below:
- `appKey`: select a certain application if there exists many applications
- `datasetSource`: the name of the cube
- `inputCohort`: the name of the cohort that is selected before and will be used in this cohort analysis