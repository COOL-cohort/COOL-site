This tutorials shows a complete example of using a local COOL package to load the sample sogamo csv dataset and executes a query.

After building the COOL system, under the root directory, execute the following command will ingest the sogamo dataset to COOL system.
```bash
java -cp ./target/cool-0.1-SNAPSHOT.jar com.nus.cool.loader.LocalLoader sogamo sogamo/table.yaml sogamo/dim_test.csv sogamo/test.csv ./test 65536
```
The command indicates that we use the LocalLoader to load the sogamo dataset. The table.yaml describing the table schema can be found at `sogamo/table.yaml`. The dimension file can be found at `sogamo/dim_test.csv`. The output directory to store the converted dataset is `test` and chunk size for COOL [cublet](../data-formats.md) is 64MB. 
A directory named `test` appears containing the converted dataset. It contains one table named sogamo and the table has one cublet.
```
test/
└── sogamo
    ├── table.yaml
    └── v1
        └── 17dd6860ee8.dz
```
Running the sample query embedded in [CohortLoader](https://github.com/COOL-cohort/COOL/blob/main/src/main/java/com/nus/cool/loader/CohortLoader.java). It returns the user retension of users built into cohorts of country, birth event and selection criteria being `launch` of the app on `2013-05-20`. 
```
$ java -cp ./target/cool-0.1-SNAPSHOT.jar com.nus.cool.loader.CohortLoader test sogamo
```
A sample query result is shown below.
```json
{
  "status" : "OK",
  "elapsed" : 0,
  "result" : [ {
    "cohort" : "null",
    "age" : 0,
    "measure" : 2
  }, {
    "cohort" : "null",
    "age" : 1,
    "measure" : 2
  }, {
    "cohort" : "United States",
    "age" : 0,
    "measure" : 2
  }, {
    "cohort" : "United States",
    "age" : 1,
    "measure" : 2
  }, {
    "cohort" : "Australia",
    "age" : 0,
    "measure" : 1
  }, {
    "cohort" : "Australia",
    "age" : 1,
    "measure" : 1
  } ]
}
```
