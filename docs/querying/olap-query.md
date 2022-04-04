---
id: olap-query
title: OLAP Query
tags: [query, olap]
---

# OLAP Query

COOL system supports conventional OLAP queries and the system has following features

1. COOL includes two operators for OLAP query namely metaChunk selector and dataChunk selector.
2. COOL includes a sophisticated storage layout to optimize query processing and space consumption. It store precomputation results to boost OLAP execution.
3. COOL is scalable when using HDFS and Zookeeper. It can also recover from failure

In this section, we provide an [example slap query](https://github.com/COOL-cohort/COOL/olap-tpch/query.json) to demonstrate how to define querys and execute it. 

## Step1. Define the data source and basic query logic

First, we need to initialize the datasource and the SQL query logic. For example we want to run iceBerg query on TPC-H dataset to find all countries in Europe area and its total amount of orders with priority equals to “2-HIGH” between January 1st, 1993 and January 1st, 1994.

```sql
SELECT cout(*), sum(O_TOTALPRICE) 
FROM TPC_H WHERE O_ORDERPRIORITY = 2-HIGH AND R_NAME = EUROPE
GROUP BY N_NAME,R_NAME 
HAVING O_ORDERDATE >= '1993-01-01' AND O_ORDERDATE <= '1994-01-01' 
```

And then we could define a query.json according to the SQL logic

## Step2. Define selection fields in query.json

```json
"selection": {
  "type": "and",
  "dimension": null,
  "values": null,
  "fields": [
    { "type": "filter",
     	"dimension": "O_ORDERPRIORITY",
     	"values": [ "2-HIGH" ],
     	"fields":[]},
    { "type": "filter",
     	"dimension": "R_NAME",
     	"values": ["EUROPE"],
     	"fields":[]},
    { "type": "filter",
     	"dimension": "O_ORDERDATE",
     	"values": ["1993-01-01|1993-12-31"],
     	"fields":[]}
  ] 
}
```

The json format use nested structure where two sub fields are connected by operator ''and",  while each operator in fields corresponding to "where" condition in step1's SQL query. 

`dimension` is the field or column we want to filter

`values` is the specified condition we used to filter on `dimension`, there are two types of operator can be used in filtering on `values`.

- Equal: single value in values means equal. Eg. "EUROPE" and "2-HIGH" in above json example
- Between:  in form of `min|max`. Eg. "1993-01-01|1993-12-31"

## Step3. Define the group by and aggregation fileds in query.json

```json
"groupFields":["N_NAME","R_NAME"],
"aggregations":[
  {"fieldName":"O_TOTALPRICE","operators":["COUNT","SUM"]}
],
```

We could GROUPBY using one or many columns, in this example we groupBy on two columns namely "N_NAME" and "R_NAME". Where "N_NAME" is the country name and "R_NAME" is the region name. 

`Aggregations` informs the aggretator operation and it's target filed. 

## Step4. Define other related information

When we filter on a column with time duration, we could indicite the time granularity on it.  

`granularityType` can be "Day", "MONTH", "YEAR" and "NULL".

If we set it to "NULL", the filter will use default setting (year-month-day) to select records.

If we set it to "MONTH" for example, it will parse the time form to year-month and then conduct filtering.

## Final version of query.json

```json
{
  "dataSource": "tpc-h-10g",
	"selection": {
    "type": "and",
    "dimension": null,
    "values": null,
    "fields": [
      { "type": "filter",
        "dimension": "O_ORDERPRIORITY",
        "values": [ "2-HIGH" ],
        "fields":[]},
      { "type": "filter",
        "dimension": "R_NAME",
        "values": ["EUROPE"],
        "fields":[]},
      { "type": "filter",
        "dimension": "O_ORDERDATE",
        "values": ["1993-01-01|1993-12-31"],
        "fields":[]}]
  	},
  "groupFields":["N_NAME","R_NAME"],
  "aggregations":[
    {"fieldName":"O_TOTALPRICE","operators":["COUNT","SUM"]}
  ],
  "granularity":"NULL"
}
```



