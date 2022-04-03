---
id: cohort-query
title: Cohort Query
tags: [query, cohort]
---

# Cohort Query 

COOL system has been designed as a very efficient cohort analytical processing system with fast response time and flexible definition of cohorts and events.

In this section, we provide an [example cohort query](https://github.com/COOL-cohort/COOL/blob/main/health/query2.json) to demonstrate how to define cohorts and events.

## Step1. Define the cohorts
First, we need to initialize cohorts (i.e., define their birth events and cohort fields) for us to observer their different trends at different stages in their life-cycles.

```json
  "birthSequence":{
    "birthEvents":[
        {
            "aggrSelection":[],
            "cohortFields":[{
                "field": "birthyear",
                "logScale": false,
                "minLevel": 195,
                "numLevel": 5,
                "scale": 10.0
            }],
            "eventSelection":[{
                "cubeField": "prescribe",
                "fieldValue": {
                    "baseEvent":-1,
                    "baseField": null,
                    "type": "AbsoluteValue",
                    "values":[
                      "Medicine-A"
                    ]
                },
            "filterType": "Set"
            }],
            "maxTrigger": -1,
            "minTrigger": 1,
            "timeWindow":{
                "length":7,
                "slice":true,
                "unit":"DAY"
            }
        }
    ]
  }
```

In this birth sequence definition, we need to list their birth events. In each birth event, we should define their `eventSelection` to select users into this cohort study.
For example, in this query, we only want to investigate the users who have taken the `Medicine-A` ( which is in an event list named as the `prescribe` ) at least once. 
Then, we divide these users by their `birth year` to see the drug effect in different age groups. In this example, we should divide them into 5 groups, that are [1950,1960), [1960,1970), [1970,1980), [1980,1990), [1990,2000).
Besides, we also can decide the time window to control that we only want users who have these birth events at continuous 7 days. To make it more flexible, we set the `slice` to be true that can slide this time window to any date.


## Step2. Define the analysis target
Second, we need to define the target event that we want to investigate. For example, in the same example cohort query, we want to observe their `labtest` event and filter the events that are tested the `Labtest-C` where the event values are in [0,100].

```json
  "ageSelection":[
    {
      "cubeField":"labtest",
      "fieldValue":{
        "baseEvent":-1,
        "baseField":null,
        "type":"AbsoluteValue",
        "values":[
          "Labtest-C"
        ]
      },
      "filterType":"Set"
    },
    {
      "cubeField":"value",
      "fieldValue":{
        "baseEvent":-1,
        "baseField":null,
        "type":"AbsoluteValue",
        "values":[
          "0|100"
        ]
      },
      "filterType":"Range"
    }
  ],
```

In this cohort query, the analysis target is defined by two events based on two columns that are `labtest` and `value`. The former one is in the Segment type, while the later one is in the Metric type. Hence, the type of first event filter should be "Set", while the type of the other one should be "Range". It totally depoends on the type of the column.

# Step3. Define the time field
Third, we need to define the time filed, that is to decide how long we want to observe and the time interval.

```json
  "ageField":{
    "ageInterval":1,
    "field":"time",
    "range":[
      "0|7"
    ]
  },
```
In this example, we want to observe for 7 days from their birthdate to 7 days later and the time interval is set to 1 day.

# Step4. Define other related information
At last, we need to complete the cohort query with other related information (e.g., cube name, input cohort, app key, etc)

```json
  "appKey":null,
  "dataSource":"health",
  "inputCohort":null,
  "measure":"retention",
  "outputCohort":null
```

These parameters are used for different perspectives:
- `appKey`: select a certain application if there exists many applications
- `datasetSource`: the name of the cube
- `inputCohort`: the name of the cohort that is selected before and will be used in this cohort analysis
- `measure`: the name of the measurement.
- `outputCohort`: the name of the cohort that is seected by this cohort and will be saved into a this cohort