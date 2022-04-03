---
id: Quickstart
title: Quickstart
tags: [introduction]
---

# Quickstart

This part will get you started with COOL and be familiar with its features. You will install COOL and learn how to use it following the next steps.

## Build the COOL

Simply run `mvn package`.

## Requirement

1. Clone the code form [Github](https://github.com/COOL-cohort/COOL).

```
git clone https://github.com/COOL-cohort/COOL.git
```

-To be continued. Describe the project structure.

2. Prepare the sources.

- **dataset file**: a csv file with "," delimiter (normally dumped from a database table), and the table header is removed.
- **dimension file**: a csv file with "," delimiter. Each line of this file has two fields: the first field is the name of a column in the dataset, and the second field is a value of this column. Each distinct value of each column in the dataset shall appear in this dimension file once.
- **dataset schema file**: a `table.yaml` file specifying the dataset's columns and their measure fileds.
- **query file**: a yaml file specify the parameters for running query server.

3. Load the dataset into COOL.

Before query processing, we need to load the dataset into COOL native format.

```
$ java -jar cool-examples/load-csv/target/load-csv-0.1-SNAPSHOT.jar path/to/your/directory path/to/your/.yaml path/to/your/dimensionfile path/to/your/datafile path/to/output/datasource/directory
```

4. Cohort Query.

There are two types of queries in COOL. The first one includes two steps.

- Select the specific users.

```
java -cp ./cool-core/target/cool-core-0.1-SNAPSHOT.jar com.nus.cool.loader.CohortCreator path/to/output/datasource/directory path/to/your/directory path/to/your/queryfile
```

- Executes cohort query on the selected users.

```
$ java -cp ./cool-core/target/cool-core-0.1-SNAPSHOT.jar com.nus.cool.loader.ExtendedCohortLoader path/to/output/datasource/directory path/to/your/directory path/to/your/queryfile
```

The second one will execute the queries on all the users.

```
$ java -cp ./cool-core/target/cool-core-0.1-SNAPSHOT.jar com.nus.cool.loader.ExtendedCohortLoader path/to/output/datasource/directory path/to/your/directory path/to/your/queryfile
```

## Example

We provide an example of the second type to explain the steps. The data directory is `health`. You can see the dimension file, dataset schema file and two query files in the directory. 

To load the dataset:

```
$ java -jar cool-examples/load-csv/target/load-csv-0.1-SNAPSHOT.jar health health/table.yaml health/dim.csv health/raw.csv ./test
```

To execute the queries:

```
$ java -cp ./cool-core/target/cool-core-0.1-SNAPSHOT.jar com.nus.cool.loader.CohortCreator test health health/query1-0.json
$ java -cp ./cool-core/target/cool-core-0.1-SNAPSHOT.jar com.nus.cool.loader.ExtendedCohortLoader test health health/query1-1.json
```

Then you can see the results like this:

```
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