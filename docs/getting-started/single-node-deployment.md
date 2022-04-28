---
id: single-node-deployment
title: Single Node Deployment
tags: [deployment]
---

# Cluster Setting

## Single node Architecture

![single_node_architecture](../assets/images/single_node_arch.png)

## Single Node Operation

By default, we can run COOL at a single node mode, as a single Java process. This is useful for debugging.

### Run a single node server

We can start the COOL's query server with the following command

```bash
java -jar cool-queryserver/target/cool-queryserver-0.0.1-SNAPSHOT.jar <datasetSource> <PORT> STANDALONE
```

For example,

```
java -jar cool-queryserver/target/cool-queryserver-0.0.1-SNAPSHOT.jar /COOL/datasetSource/ 9009 STANDALONE
```

where the argument is as follows:

1. `datasetSource`: the path to the repository of compacted datasets.
2. `9009`: the port of the server.
3. `STANDALONE`: run as a single-node model

### API

In this server, we implement many APIs and list their corresponding URLs as follows:

- \[server:port]: info

    - List all workable URLs

  ```bash
  curl --location --request GET 'http://localhost:9009/info'
  ```

- \[server:port]: load

    - Reload the cube to the native format

  ```bash
  curl --location --request POST 'http://127.0.0.1:9009/load' \
  --header 'Content-Type: application/json' \
  --data-raw '{"dataFileType": "CSV", "cubeName": "health", "schemaPath": "health/table.yaml", "dimPath": "health/dim.csv", "dataPath": "health/raw2.csv", "outputPath": "datasetSource"}'
  ```

- \[server:port]: listcubes

    - List existing cubes

  ```bash
  curl --location --request GET 'http://127.0.0.1:9009/listcubes'
  ```

- \[server:port]: cohort/list

    - List all cohorts from the selected cube

  ```bash
  curl --location --request GET 'http://127.0.0.1:9009/cohort/list?cube=health'
  ```

- \[server:port]: cohort/selection

    - Cohort Selection

  ```bash
  curl --location --request POST 'http://127.0.0.1:9009/cohort/selection' \
  --header 'Content-Type: application/json' \
  --form 'queryFile=@"COOL/health/query1-0.json"'
  ```

- \[server:port]:v1/cohort/exploration

    - Cohort Exploration

- \[server:port]: /cohort/cohort-analysis

    - Perform cohort analysis

  ```bash
  curl --location --request POST 'http://127.0.0.1:9009/cohort/cohort-analysis' \
  --header 'Content-Type: application/json' \
  --form 'queryFile=@"/COOL/health/query2.json"'
  ```

- \[server:port]:v1/funnel/analysis

    - Perform funnel analysis

  ```bash
  curl --location --request POST 'http://127.0.0.1:9009/cohort/funnel-analysis' \
  --header 'Content-Type: application/json' \
  --form 'queryFile=@"/COOL/sogamo/query1.json"'
  ```

- \[server:port]: /olap/iceberg

    - Perform iceberg query

  ```bash
  curl --location --request POST 'http://127.0.0.1:9009/olap/iceberg' \
  --header 'Content-Type: application/json' \
  --form 'queryFile=@"/COOL/olap-tpch/query.json"'
  ```