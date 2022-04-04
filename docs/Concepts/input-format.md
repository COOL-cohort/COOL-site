---
id: input-format
title: Data Ingestion
tags: [data-loader, input-format]
---

# Input Formats
COOL supports multiple popular input data formats, from which the system can automatically convert them into native storage format. Currently, we have basic support for CSV, Parquet, Avro, and Arrow files. Note that to load the data into COOL, the input data shall have a compatible schema and a YAML file that describes the table according to COOL specifications. Please find out additional requirements for a specific format below. Notably, we require that records of users are grouped together.

:::caution Data requirement
In COOL 0.1.0, it only accepts datasets where each user data is grouped together and is ordered by time. Supporting more flexible settings of the dataset is currently in experimental status.
:::

## CSV
COOL requires two additional files besides the CSV file that contains raw data.
* table.yaml: a YAML file that specifies the schema
* dimension.csv: a csv file that specifies the value range of each dimension (optional)

Loading support for csv files is in COOL's core (no extensions modules needed).
## Parquet
To use the Parquet loader, the parquet-extensions module is needed.
Pass the ParquetDataLoaderConfig as the DataLoaderConfig to the DataLoader builder, so that the DataLoader can process raw data stored parquet files. All fields including nested fields are serialized to String to be parsed by COOL.

## Avro
Avro data consists of two files a data file and a schema file. To use the Avro loader, the Avro-extensions module is needed. Pass the AvroDataLoaderConfig as to the DataLoader builder.

## Arrow IPC file
We provide basic support for [Arrow IPC file format](https://arrow.apache.org/docs/format/Columnar.html#ipc-file-format) that only uses record batches. The support for dictionary and delta dictionary messages may be added in the future. To use this feature, the arrow-extensions module is needed. Pass the ArrowIPCFileDataLoaderConfig to DataLoader builder.

## Tutorial
A tutorial to work on the different formats of the sogamo sample data is [here](tutorials/tutorial-input-formats.md)

## Extension
Developers are welcome to add additional support for other data formats. The interface to implement is the [DataLoaderConfig](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/util/config/DataLoaderConfig.java). A DataLoaderConfig takes the input data to create a TupleReader that iterate over records, and a TupleParser that processes each record to a list of string that follows the order according to the schema specified in the table.yaml file. Once the DataLoaderConfig for the new format is implemented, loading can be done in two lines:
```java
CoolLoader coolLoader = new CoolLoader(dataLoaderConfig);
coolLoader.load(cube, schemaFileName, dimensionFileName, dataFileName, cubeRepo);
```