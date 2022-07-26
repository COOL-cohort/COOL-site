---
id: tutorial-input-format
title: Turorial-input-format
tags: [data-loader, input-format]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to Load Data to COOL
This tutorial firstly shows a complete example of using a local COOL package to load the sample sogamo csv dataset and executes a query. Then describes briefly how the data in other formats can be similarly loaded.
## Data sources
Let's take a look at all the source files:
* schema file: Each field is described by a quadruplet of name, field type, invariant field (whether the field is invariant to user) and preCAL (if pre-calculation is used for building COOL's cube). The charset used to write data in bytes can also be changed in this YAML file. Please refer to the [schema instruction](/docs/Concepts/schema) for more details about how to select the filedType.
  ```yaml
  ---
  charset: "UTF-8"
  fields:
  - name: "sessionId"
    fieldType: "AppKey"
    invariantField: false
    preCal: false
  - name: "playerId"
    fieldType: "UserKey"
    invariantField: false
    preCal: false
  - name: "role"
    fieldType: "Segment"
    invariantField: true
    preCal: false
  - name: "money"
    fieldType: "Metric"
    invariantField: false
    preCal: false
  - name: "event"
    fieldType: "Action"
    invariantField: false
    preCal: false
  - name: "eventDay"
    fieldType: "ActionTime"
    invariantField: false
    preCal: false
  ```
* data file, each records follow the field order specified in the schema file 
  ```
  fd1ec667-75a4-415d-a250-8fbb71be7cab,43e3e0d84da1056,stonegolem,1638,launch,2013-05-20,3,Australia,OC,Sydney,1,0
  fd1ec667-75a4-415d-a250-8fbb71be7cab,43e3e0d84da1056,stonegolem,1638,fight,2013-05-20,3,Australia,OC,Sydney,1,0
  fd1ec667-75a4-415d-a250-8fbb71be7cab,43e3e0d84da1056,stonegolem,1638,fight,2013-05-20,3,Australia,OC,Sydney,1,0
  ```

## Loading
After building the COOL system, under the root directory, execute the following command will ingest the sogamo dataset to COOL system.

<Tabs>
<TabItem value="Python">
In Python developing environment, we can send the query by the `request` package

```jsx
requests.post("http://127.0.0.1:8080/v1/load", data='{"dataFileType": "CSV", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/test.csv", "outputPath": "datasetSource"}').text 
```
</TabItem>

<TabItem value="Jar">

```bash
$ java -cp ./cool-core/target/cool-core-0.1-SNAPSHOT.jar com.nus.cool.functionality.CsvLoader sogamo sogamo/table.yaml sogamo/dim_test.csv sogamo/test.csv datasetSource
```

The command indicates that we use the CsvLoader to load the sogamo dataset.

`sogamo`:(required)  the name of the cube, a unique dataset name under the cube directory

`sogamo/table.yaml`:(required) the path to the table.yaml that describes the table schema

`sogamo/dim_test.csv`:(required) the path to the dimension file

`sogamo/test.csv`:(required) the path to the raw data that is in csv format

`datasetSource`:(required) the name of the cube repository that stores the converted dataset

</TabItem>

<TabItem value="CURL">

```bash
curl -X POST -H "Content-Type: text/plain" -d '{"dataFileType": "CSV", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/test.csv", "outputPath": "datasetSource"}'  http://127.0.0.1:8080/v1/load
```

</TabItem>
</Tabs>


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
For Parquet and Arrow IPC file, one can substitute the loader and raw data file for other types of data file.
- For Parquet file

<Tabs>
<TabItem value="Python">
In Python developing environment, we can send the query by the `request` package

```jsx
requests.post("http://127.0.0.1:8080/v1/load", data='{"dataFileType": "PARQUET", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/test.parquet", "outputPath": "datasetSource"}').text 
```
</TabItem>

<TabItem value="Jar">

```bash
$ java -cp ./cool-core/target/cool-core-0.1-SNAPSHOT.jar com.nus.cool.functionality.CsvLoader sogamo sogamo/table.yaml sogamo/dim_test.csv sogamo/test.parquet datasetSource
```

The command indicates that we use the CsvLoader to load the sogamo dataset.

`sogamo`:(required)  the name of the cube, a unique dataset name under the cube directory

`sogamo/table.yaml`:(required) the path to the table.yaml that describes the table schema

`sogamo/dim_test.csv`:(required) the path to the dimension file

`sogamo/test.parquet`:(required) the path to the raw data that is in csv format

`datasetSource`:(required) the name of the cube repository that stores the converted dataset

</TabItem>

<TabItem value="CURL">

```bash
curl -X POST -H "Content-Type: text/plain" -d '{"dataFileType": "PARQUET", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/test.parquet", "outputPath": "datasetSource"}'  http://127.0.0.1:8080/v1/load
```

</TabItem>
</Tabs>








- For Arrow IPC file

<Tabs>
<TabItem value="Python">
In Python developing environment, we can send the query by the `request` package

```jsx
requests.post("http://127.0.0.1:8080/v1/load", data='{"dataFileType": "ARROW", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/test.arrow", "outputPath": "datasetSource"}').text 
```
</TabItem>

<TabItem value="Jar">

```bash
$ java -jar cool-extensions/arrow-extensions/target/arrow-extensions-0.1-SNAPSHOT.jar sogamo sogamo/table.yaml sogamo/dim.csv sogamo/test.arrow datasetSource
```

The command indicates that we use the CsvLoader to load the sogamo dataset.

`sogamo`:(required)  the name of the cube, a unique dataset name under the cube directory

`sogamo/table.yaml`:(required) the path to the table.yaml that describes the table schema

`sogamo/dim_test.csv`:(required) the path to the dimension file

`sogamo/test.arrow`:(required) the path to the raw data that is in csv format

`datasetSource`:(required) the name of the cube repository that stores the converted dataset

</TabItem>

<TabItem value="CURL">

```bash
$ curl -X POST -H "Content-Type: text/plain" -d '{"dataFileType": "ARROW", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/test.arrow", "outputPath": "datasetSource"}'  http://127.0.0.1:8080/v1/load
```

</TabItem>
</Tabs>







For Avro file, the schema file `sogamo/avro/schema.avsc` shall also be supplied.

<Tabs>
<TabItem value="Python">
In Python developing environment, we can send the query by the `request` package

```jsx
requests.post("http://127.0.0.1:8080/v1/load", data='{"dataFileType": "AVRO", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/avro/test.avro", "outputPath": "datasetSource", "configPath": "sogamo/avro/schema.avsc"}').text 
```
</TabItem>

<TabItem value="Jar">

```bash
$ java -jar cool-extensions/avro-extensions/target/avro-extensions-0.1-SNAPSHOT.jar sogamo sogamo/table.yaml sogamo/dim.csv sogamo/avro/test.avro datasetSource sogamo/avro/schema.avsc
```

The command indicates that we use the CsvLoader to load the sogamo dataset.

`sogamo`:(required)  the name of the cube, a unique dataset name under the cube directory

`sogamo/table.yaml`:(required) the path to the table.yaml that describes the table schema

`sogamo/dim_test.csv`:(required) the path to the dimension file

`sogamo/avro/test.avro`:(required) the path to the raw data that is in csv format

`datasetSource`:(required) the name of the cube repository that stores the converted dataset

`sogamo/avro/schema.avsc`:(required) the path to the setting of the avro config file

</TabItem>

<TabItem value="CURL">

```bash
curl -X POST -H "Content-Type: text/plain" -d '{"dataFileType": "AVRO", "cubeName": "sogamo", "schemaPath": "sogamo/table.yaml", "dimPath": "sogamo/dim.csv", "dataPath": "sogamo/avro/test.avro", "outputPath": "datasetSource", "configPath": "sogamo/avro/schema.avsc"}'  http://127.0.0.1:8080/v1/load
```

</TabItem>
</Tabs>

