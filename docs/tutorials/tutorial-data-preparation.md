---
id: tutorial-data-preparation
title: Turorial-data-preparation
tags: [data-paration, data-input]
---

# TPC-H dataset

This tutorials shows how to download and convert TPC-H dataset into COOL inputs.

## Download TPC-H dataset.

Download from [data source](https://www.tpc.org/tpc_documents_current_versions/download_programs/tools-download-request5.asp?bm_type=TPC-H&bm_vers=3.0.0&mode=CURRENT-ONLY) and extract from data from the tic zip file.

## Prepare `Table.yaml`

we need to firstly define `table.yaml ` to describe each filed. 

```yaml
charset: "UTF-8"
fields:
- name: "O_ORDERKEY"
  fieldType: "Segment"
  preCal: false
- name: "O_ORDERSTATUS"
  fieldType: "Segment"
  preCal: false
- name: "O_TOTALPRICE"
  fieldType: "Metric"
  preCal: false
- name: "O_ORDERDATE"
  fieldType: "ActionTime"
  preCal: false
- name: "O_ORDERPRIORITY"
  fieldType: "Segment"
  preCal: false
- name: "O_CLERK"
  fieldType: "Segment"
  preCal: false
- name: "O_SHIPPRIORITY"
  fieldType: "Segment"
  preCal: false
- name: "O_COMMENT"
  fieldType: "Segment"
  preCal: false
- name: "C_NAME"
  fieldType: "Segment"
  preCal: false
- name: "C_ADDRESS"
  fieldType: "Segment"
  preCal: false
- name: "C_PHONE"
  fieldType: "Segment"
  preCal: false
- name: "C_ACCTBAL"
  fieldType: "Metric"
  preCal: false
- name: "C_MKTSEGMENT"
  fieldType: "Segment"
  preCal: false
- name: "C_COMMENT"
  fieldType: "Segment"
  preCal: false
- name: "N_NAME"
  fieldType: "Segment"
  preCal: false
- name: "N_COMMENT"
  fieldType: "Segment"
  preCal: false
- name: "R_NAME"
  fieldType: "Segment"
  preCal: false
- name: "R_COMMENT"
  fieldType: "Segment"
  preCal: false
- name: "app"
  fieldType: "AppKey"
  preCal: false
- name: "user"
  fieldType: "UserKey"
  preCal: false
```

## Extract TPC-H dataset and convert to `dim.csv`, `data.csv`

1. In `/TPC-H_Tools_v3.0.0/dbgen`  run

   ```bash
   cp makefile.suite makefile
   ```

2. Open the Makefile, find and modify the following lines (103~111)

   ```c++
   ################
   ## CHANGE NAME OF ANSI COMPILER HERE
   ################
   CC      = gcc 
   # Current values for DATABASE are: INFORMIX, DB2, TDAT (Teradata)
   #                                  SQLSERVER, SYBASE, ORACLE, VECTORWISE
   # Current values for MACHINE are:  ATT, DOS, HP, IBM, ICL, MVS, 
   #                                  SGI, SUN, U2200, VMS, LINUX, WIN32 
   # Current values for WORKLOAD are:  TPCH
   DATABASE= SQLSERVER
   MACHINE = LINUX
   WORKLOAD = TPCH
   ```

3. For Mac users,  update package name from 

   ```c
   #include <malloc.h>
   ```

   to

   ```c
   #include <sys/malloc.h>
   ```

   for each file. 

4. Compile with

   ```bash
   make
   ```

5. In `/TPC-H_Tools_v3.0.0/dbgen` , generate  table namely with

   ```bash
   ./dbgen -f -s n
   ```

   where n is size of data in GB, it can be 1, 10, 0.1
   eg.

   ```bash
   ./dbgen -f -s 0.1
   ```

