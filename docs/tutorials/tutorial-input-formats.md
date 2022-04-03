---
id: tutorial-input-format
title: Turorial-input-format
tags: [data-loader, input-format]
---
# How to Load Data to COOL
This tutorials firstly shows a complete example of using a local COOL package to load the sample sogamo csv dataset and executes a query. Then describes briefly how the data in other format can be similarly loaded.
## Data sources
Let's take a look at all the source files:
* schema file: Each field is described by a triplet of name, time and preCAL (if pre calculation is used for building COOL's cube). The charset used to write data in bytes can also be changed in this yaml file. 
  ```yaml
  ---
  charset: "UTF-8"
  fields:
  - name: "sessionId"
    fieldType: "AppKey"
    preCal: false
  - name: "playerId"
    fieldType: "UserKey"
    preCal: false
  - name: "role"
    fieldType: "Segment"
    preCal: false
  - name: "money"
    fieldType: "Metric"
    preCal: false
  - name: "event"
    fieldType: "Action"
    preCal: false
  - name: "eventDay"
    fieldType: "ActionTime"
    preCal: false
  ```
* dimension file: It includes comma separated pairs of `field-name,value`, to describe all unique values a field can take. For `Metric` and `ActionTime` field, only the `min|max` is needed.
  ```
  playerId,e9a3374d0d418cdf
  eventDay,2013-05-20|2013-06-26
  country,Australia
  country,United States
  ```
* data file, each records follow the field order specified in the schema file 
  ```
  fd1ec667-75a4-415d-a250-8fbb71be7cab,43e3e0d84da1056,stonegolem,1638,launch,2013-05-20,3,Australia,OC,Sydney,1,0
  fd1ec667-75a4-415d-a250-8fbb71be7cab,43e3e0d84da1056,stonegolem,1638,fight,2013-05-20,3,Australia,OC,Sydney,1,0
  fd1ec667-75a4-415d-a250-8fbb71be7cab,43e3e0d84da1056,stonegolem,1638,fight,2013-05-20,3,Australia,OC,Sydney,1,0
  ```

## Loading
After building the COOL system, under the root directory, execute the following command will ingest the sogamo dataset to COOL system.
```bash
$ java -cp ./cool-core/target/cool-core-0.1-SNAPSHOT.jar com.nus.cool.functionality.CsvLoader path/to/your/source/directory path/to/your/.yaml path/to/your/dimensionfile path/to/your/datafile path/to/output/datasource/directory
```
The command indicates that we use the CsvLoader to load the sogamo dataset. 
* `sogamo`: a unique dataset name under the output directory
* `sogamo/table.yaml`: the table.yaml describing the table schema
* `sogamo/dim_test.csv`: the dimension file 
* `sogamo/test.csv`: the raw data in csv format
* `test`: the output directory to store the converted dataset 

## Output
A directory named `test` appears containing the converted dataset. It contains one table named sogamo and the table has one cublet.
```
test/
└── sogamo
    ├── table.yaml
    └── v1
        └── 17dd6860ee8.dz
```

## Work with other formats
For Parquet and Arrow IPC file, one can substitute the loader and raw data file.
```
$ java -jar cool-extensions/parquet-extensions/target/parquet-extensions-0.1-SNAPSHOT.jar sogamo sogamo/table.yaml sogamo/dim.csv sogamo/test.parquet datasetSource
```
```
$ java -jar cool-extensions/arrow-extensions/target/arrow-extensions-0.1-SNAPSHOT.jar sogamo sogamo/table.yaml sogamo/dim.csv sogamo/test.arrow datasetSource
```
For Avro file, the schema file `sogamo/avro/schema.avsc` shall also be supplied.
```
$ java -jar cool-extensions/avro-extensions/target/avro-extensions-0.1-SNAPSHOT.jar sogamo sogamo/table.yaml sogamo/dim.csv sogamo/avro/test.avro datasetSource sogamo/avro/schema.avsc
```
