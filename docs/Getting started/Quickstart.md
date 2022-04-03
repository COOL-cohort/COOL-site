---
id: Quickstart
title: Quickstart
tags: [Quickstart]
---

# Quickstart

This part will get you started with COOL and be familiar with its features. You could install COOL and learn how to use it following the next steps.

## Requirement

COOL can be installed on a small machine. The software requirements for COOL are:

- Linux, Mac OS X, Windows (maybe command-line tool such as Git is required) and other Unix-like OS
- Maven, Java8

## Installation and instruction

1. Clone the code form [Github](https://github.com/COOL-cohort/COOL).

```
git clone https://github.com/COOL-cohort/COOL.git
```

2. Prepare the resources.

You have to prepare some files before using COOL.

- **dataset file**: a csv file with "," delimiter (normally dumped from a database table), and the table header is removed.
- **dimension file**: a csv file with "," delimiter. Each line of this file has two fields: the first field is the name of a column in the dataset, and the second field is a value of this column. Each distinct value of each column in the dataset shall appear in this dimension file once.
- **dataset schema file**: a `table.yaml` file specifying the dataset's columns and their measure fileds.
- **query file**: a yaml file specify the parameters for running query server.

3. Build COOL

Simply run `mvn package`.

4. Load the dataset into COOL.

Before query processing, we need to load the dataset into COOL native format.

```
$ java -jar cool-examples/load-csv/target/load-csv-0.1-SNAPSHOT.jar path/to/your/directory path/to/your/.yaml path/to/your/dimensionfile path/to/your/datafile path/to/output/datasource/directory
```

5. Cohort Query.

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

## Query server

COOL has an [StorageService](cool-core/src/main/java/com/nus/cool/storageservice/StorageService.java) interface, which will allow COOL standalone server/workers (coming soon) to handle data movement between local and external storage service. A sample implementation for HDFS connection can be found under the [hdfs-extensions](cool-extensions/hdfs-extensions/).

You can start the COOL's query server with the following command:

```
$ java -jar cool-queryserver/target/cool-queryserver-0.1-SNAPSHOT.jar path/to/your/datasetSource/directory /portnumber
```

where the arguments are as follows:
- **datasetSource**: the path to the repository of compacted datasets.
- **portnumber**: the port of the server.

In this server, we implement many APIs and list their corresponding urls as follows:
- \[server:port]:v1
  - List all workable urls
- \[server:port]:v1/reload?cube=[cube_name]
  - Reload the cube
- \[server:port]:v1/list
  - List existing cubes
- \[server:port]:v1/cohort/list?cube=[cube_name]
  - List all cohorts from the selected cube
- \[server:port]:v1/cohort/selection 
  - Cohort Selection
- \[server:port]:v1/cohort/analysis
  - Perform cohort analysis

## Other information

After finishing the quickstart, you could check out the data format to load other kinds of data and the blogs to learn about the applications of cohort analysis and COOL. The followings are the resources you may need.

---

- [Website](http://13.212.103.48:3001/) - The main website of COOL. There are many resources here.
- [Documentation](http://13.212.103.48:3001/docs/tutorials/tutorial-csv) - The documents could help you understand COOL better.
- [Blog](http://13.212.103.48:3001/blog) - Learn more about COOL with the friendly blogs.
- [Demo](https://www.comp.nus.edu.sg/~dbsystem/cool/#/demo) - Now you can operate the system and get some interesting results.
- [GitHub](https://github.com/COOL-cohort/COOL) - Welcome to contribute to COOL.

---