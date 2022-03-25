---
sidebar_position: 2
id: concept
title: concept
tags: [welcome]
---

## Necessity of COOL
The design of OLAP systems cannot serve modern applications well due to their inefficiency in processing complex queries such as cohort queries with low query latency. As a cohort online analytical processing system, COOL can support several newly proposed operators on top of a sophisticated storage layer and processes both cohort queries and conventional OLAP queries with superb performance. Its distributed design contains minimal load balancing and fault tolerance support and is scalable. 

## Cohort Query in COOL
COOL system allows users to perform cohort query to gain behavioral data of users in different groups. COOL supports aggregations on cohorts born with a series of events, namely an event sequence, along either a fixed time window or an elastic time window delimited by given events. The execution of a cohort query is divided into three steps: 
- Find birth user cohort, which is to locate users experiencing similar given events or characteristics and group them into corresponding cohorts.
- Calculate the ages of the users in the cohorts, which is to, for each user in the cohort,cut the corresponding records into diverse segments by given delimiters along time axis.
- Aggregate the metrics, which is to measure the value on each segment by a given aggregator.

As an OLAP system which provide cohort queries operators for users, COOL demonstrates an extraordinary performance in terms of scalability and efficiency compared to existing cohort queries engines and traditional OLAP systems.

### Scalability of COOL
The scalablity of COOL are presented in two perspectives. Firstly, COOL not only supports single-node architecture but also have multi-node version. This enables COOL to provide more efficient processing queries. Secondly, the cohort operators can accelerate cohort query at scale, thus suitable for large data. 

COOL designs approriate data storage and query methods for the two different architectures. In the single-node architecture, the tables are horizontally split into different cublets and each cublet consists of multiple chunks, where the metaChunk contains all the values for a corresponding field in this cublet. To reduce space consumption and improve scalability, COOL employs various compression algorithms and encoding schemes based on the storage plan for different field types. More details about the data storage can be found in Data Formats part. In distributed architecture, a distributed storage is used instead of the local storage and besides all the components in single-node architecture, an additional broker is introduced.

### Efficiency of COOL
More specifically, COOL can use less memory to represent the data compared to traditional systems due to the sophisticated storage design. That is, COOL scans more data records than other systems in each disk fetch and therefore encounters less slow disk fetches for the same dataset. Apart from this, the tuning strategies in query processing further reduce the number of records to scan, leading to competitive performance gains. The system can skip the scanning of the cublets without
the queried values by metaChunk selection. Meanwhile, the execution of predicates further cut down the scanning cost as the process can be terminated early as described previously.