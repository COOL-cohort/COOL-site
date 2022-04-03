---
id: storage-service
title: StorageService
tags: [storage-service]
---

# StorageService (Coming soon)
A StorageService connection allow a COOL standalone server/workers to store and retrieve data on a external data storage, for example, an NFS, a HDFS cluster or AWS S3 service. A worker will attemp to pull the data from the storage service if it is not found locally. Data generated by COOL can be persisted to the storage service to increase fault tolerance and provide access by other workers or other systems. The StorageService works at the granularity of file locally.

A sample implementation for HDFS connection can be found under the hdfs-extensions.

## Extension
Developers are welcome to provide connection to other type of storage services by implementing the [StorageService](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/storageservice/StorageService.java) interface.