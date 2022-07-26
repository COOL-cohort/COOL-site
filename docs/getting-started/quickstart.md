---
id: quickstart
title: Quickstart
tags: [introduction]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart

This part will get you started with COOL and be familiar with its features. Following below steps, you will deploy the COOL system locally and learn how to use it.


## Requirement

:::info Prerequisites
COOL supports java 8 and java 11 environment.
:::

We can also build the COOL system from the source code in this environment.

First, we need to download the latest COOL distribution to follow this tutorial. We can either download the published distribution or build the distribution from the source code on Github.



<Tabs>
<TabItem value="Build from source">

:::caution
System should install Apache Maven 3.8 or higher 
:::

We can clone the codes from official [Github](https://github.com/COOL-cohort/COOL) and build the COOL system locally with the following command

```
git clone https://github.com/COOL-cohort/COOL.git
mvn clean package
```
</TabItem>

<TabItem value="Download the distribution">

Download the latest release from a cloud server.

```jsx
wget http://13.212.103.48:3001/cool-queryserver-0.1-SNAPSHOT.jar
```

</TabItem>
</Tabs>

We prefer that you can build the COOL system from the source codes in Github because we also provide many executable files, sample data, sample query files, and so on for a better illustration of the COOL system.


## Step1: Start the server

Now, we already have a released version of the COOL system and can start the COOL server locally on the command-line client with the following command.
```jsx
java -jar cool-queryserver/target/cool-queryserver-0.1-SNAPSHOT.jar datasetSource 8080
```

In this command, two parameters are needed that are
- datasetSource: (required) the name of the cube repository;
- 8080: (option) the port of the server. Default port is the 8080;


## Step2: Load datasets

In this step, we need to load a new dataset into our COOL system as a new cube. COOL system supports multiple types of data files, including CSV, Parquet, Arrow, AVRO, HDFS. 

Here, we take the CSV data file as an example to demonstrate how to load a dataset. Overall, we need to prepare several necessary files, that are

- **dataset file**: a csv file with "," delimiter (normally dumped from a database table), and the table header is removed.
- **dataset schema file**: a yaml file specifying the dataset's columns and their measure fields.

More details about these files are contained in the [Data Ingestion Section](/docs/Concepts/input-format). 

Once these files are prepared, we can package our LOAD query into a dictonary.

```json
{
    "dataFileType": "CSV",
    "cubeName": "sogamo",
    "schemaPath": "sogamo/table.yaml",
    "dimPath": "sogamo/dim.csv",
    "dataPath": "sogamo/test.csv",
    "outputPath":"datasetSource"
}
```

In this LOAD query, six parameters are needed that are
- dataFileType: (required) 
- cubeName: (option) the port of the server. Default port is the 8080;
- schemaPath: (required) the path to the schema file;
- dataFileType: (required) the path to the source data file;
- outputPath: (required) the name of the output fold, i.e., the name of the cube repository;
- configPath: (option) the path to the config file. It is only needed when processing the AVRO data now.

Now, we can send a request to the server with this LOAD query by the URL `/v1/load/`.

<Tabs>

<TabItem value="Python">

In Python developing environment, we can send the query by the `request` package

```jsx
requests.post("http://127.0.0.1:8080/v1/load", data='{"dataFileType": "CSV", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/test.csv", "outputPath": "datasetSource"}').text 
```
</TabItem>

<TabItem value="CURL">
On the command line, we can send a request by the CURL command.

curl -X POST -H "Content_Type: text/plain" -d '{"dataFileType": "CSV", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/test.csv", "outputPath": "datasetSource}'  http://127.0.0.1:8080/v1/load

</TabItem>

</Tabs>


## Step 3. Conduct cohort selection (option)

There are many types of functionalities in our COOL system, we first introduce the cohort selection function that can help us filter unnecessary users before conducting cohort analysis.

For a better illustration, we provide several examples for a synthetic healthcare dataset (i.e., namely, [health](https://github.com/COOL-cohort/COOL/blob/main/health)) to show how we can conduct a complicated cohort analysis.

Before directly conducting cohort analysis, we may have to filter users to roughly reduce the number of useless users. 
For example, with the [query](https://github.com/COOL-cohort/COOL/blob/main/health/query1-0.json), we only choose the users who have at least one event of taking the Medicine-B in 7 continuous days, and save them into a cohort called as `loyal`.

```json
{
  "birthSequence":{
    "birthEvents":[
      {
        "eventSelection":[
          {
            "cubeField":"diagnose",
            "fieldValue":{
              "baseEvent":-1,
              "baseField":null,
              "type":"AbsoluteValue",
              "values":[
                "Disease-B"
              ]
            },
            "filterType":"Set"
          }
        ],
        "maxTrigger":-1,
        "minTrigger":1,
        "timeWindow":{
          "length":7,
          "slice":true,
          "unit":"DAY"
        }
      }
    ]
  },
  "dataSource":"health",
  "outputCohort":"loyal"
}
```




## Step4. Conduct cohort analysis

Cohort analysis is one of the most essential functionalities in our COOL system. In COOL system, we are able to flexibly design the cohort query. For example, it is easy for us to design the initial cohort users, birth events, and diverse filters.

Following the aforementioned cohort selection step, we can analyze results that concentrate on these selected users. Specifically, we analyze their Labtest-C events with values in the range from 45 to 100, and group these users by their year ages.

### Submit query.json file

We provide an [example cohort query](https://github.com/COOL-cohort/COOL/blob/main/health/query1-1.json) for the `health` dataset to demonstrate how we design the cohort analysis.

```json
{
  "ageField":{
    "ageInterval":1,
    "field":"time",
    "range":[
      "0|7"
    ]
  },
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
          "45|100"
        ]
      },
      "filterType":"Range"
    }
  ],
  "appKey":"fd1ec667-75a4-415d-a250-8fbb71be7cab",
  "birthSequence":{
    "birthEvents":[
      {
        "cohortFields":[
          {
            "field":"birthyear",
            "logScale":false,
            "minLevel":195,
            "numLevel":5,
            "scale":10
          }
        ],
        "eventSelection":[
          {
            "cubeField":"prescribe",
            "fieldValue":{
              "baseEvent":-1,
              "baseField":null,
              "type":"AbsoluteValue",
              "values":[
                "Medicine-A"
              ]
            },
            "filterType":"Set"
          }
        ],
        "maxTrigger":-1,
        "minTrigger":1
      }
    ]
  },
  "dataSource":"health",
{/* highlight-start */}
  "inputCohort":"loyal",
{/* highlight-end */}
  "measure":"retention"
}

```

We can also analyze the whole group of users in this `health` dataset, that is to change this `inputCohort` into a `null` value.

### Achieve the results

You can now see the results in the console and leverage these results.

After these Then you can see the results like this:

```json
 {
  "status" : "OK",
  "elapsed" : 0,
  "result" : [ {
    "cohort" : "((1950, 1960])",
    "age" : 0,
    "measure" : 740.0,
    "min" : 45.0,
    "max" : 96.0,
    "sum" : 4516.0,
    "num" : 79.0
  }, {
    "cohort" : "((1950, 1960])",
    "age" : 1,
    "measure" : 49.0,
    "min" : 46.0,
    "max" : 72.0,
    "sum" : 981.0,
    "num" : 18.0
  }, {
    "cohort" : "((1950, 1960])",
    "age" : 2,
    "measure" : 57.0,
    "min" : 45.0,
    "max" : 81.0,
    "sum" : 2032.0,
    "num" : 37.0
  }, {
    "cohort" : "((1950, 1960])",
    "age" : 3,
    "measure" : 34.0,
    "min" : 45.0,
    "max" : 72.0,
    "sum" : 1666.0,
    "num" : 30.0
  },
  ...
```

In the results, we can easily see the cohort with their age range and the number of users that satisfy our cohort query definition at different stages (i.e., ages). Drawing these results into a line chart or heatmap, it is obvious to analyze the relative speed for the Medicine-A to take effect in different cohorts.
Besides, when we come to the event filters that are in the value type, COOL can also analyze the statistical values of the events at different stages.

## Step5. Conduct OLAP analysis

Conventional OLAP  is an essential functionalities in our COOL system. COOL supprots two operators for OLAP query.

1. MetaChunk selector: find weter the chunk contains the data
2. DataChunk selector: find matched data records in query processing.

The whole **OLAP Processing Flow** can be divided in follow steps.

1. `Planner` => generate execution plan
2. Fetch a `cublet` from specified data source.
3. `MetaChunk selector` => find `cublet` with candidate values
4. Repeat form 2 unit find a `cublet`
5. `DataChunk selector` => find records.
6. `Aggregators` on the scanning result and group the results;
7. Repeat from 2 until all cublets are processed. 
8. `Compressor`: compress and store agggregate results

Now For TPC-H dataset, find all countries in Europe area and its total amount of orders with priority equals to “2-HIGH” between January 1st, 1993 and January 1st, 1994.

### Submit query.json file

Firstly define a query.json as shown in [query.json](

We provide an [example slap query](https://github.com/COOL-cohort/COOL/olap-tpch/query.json) for the `tpch` dataset to demonstrate how we design the OLAP analysis.

```json
{
  "dataSource": "tpc-h-10g",
  "selection": {
    "type": "and",
    "dimension": null,
    "values": null,
    "fields": [
      { "type": "filter","dimension": "O_ORDERPRIORITY","values": [ "2-HIGH" ],"fields":[]},
      { "type": "filter","dimension": "R_NAME","values": ["EUROPE"],"fields":[]}
    ] },
  "groupFields":["N_NAME","R_NAME"],
  "aggregations":[
    {"fieldName":"O_TOTALPRICE","operators":["COUNT","SUM"]}
  ],
  "timeRange":"1993-01-01|1994-01-01",
  "granularity":"NULL"
}
```

### Achieve the results

You can now see the results in the console and leverage these results.

After these Then you can see the results like this:

```json
{
  "status" : "OK",
  "elapsed" : 0,
  "result" : [ {
    "timeRange" : "1993-01-01|1994-01-01",
    "key" : "RUSSIA|EUROPE",
    "fieldName" : "O_TOTALPRICE",
    "aggregatorResult" : {
      "count" : 2.0,
      "sum" : 312855,
      "average" : null,
      "max" : null,
      "min" : null,
      "countDistinct" : null
    }
  }, {
    "timeRange" : "1993-01-01|1994-01-01",
    "key" : "GERMANY|EUROPE",
    "fieldName" : "O_TOTALPRICE",
    "aggregatorResult" : {
      "count" : 1.0,
      "sum" : 4820,
      "average" : null,
      "max" : null,
      "min" : null,
      "countDistinct" : null
    }
  }, {
    "timeRange" : "1993-01-01|1994-01-01",
    "key" : "ROMANIA|EUROPE",
    "fieldName" : "O_TOTALPRICE",
    "aggregatorResult" : {
      "count" : 2.0,
      "sum" : 190137,
      "average" : null,
      "max" : null,
      "min" : null,
      "countDistinct" : null
    }
  }, {
    "timeRange" : "1993-01-01|1994-01-01",
    "key" : "UNITED KINGDOM|EUROPE",
    "fieldName" : "O_TOTALPRICE",
    "aggregatorResult" : {
      "count" : 1.0,
      "sum" : 33248,
      "average" : null,
      "max" : null,
      "min" : null,
      "countDistinct" : null
    }
  } ]
}
```



