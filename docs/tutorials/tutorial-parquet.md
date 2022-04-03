This tutorials shows a complete example of loading raw data in parquet format with COOL DataLoader. It is based on the sample sogamo csv dataset as the csv tutorial.

The sample code can be found under cool-examples/load-parquet. Besides cool-core, this tutorials also assumes that the parquet-extensions and the load-parquet example are compiled and packaged.
Under the root directory, execute the following command will create a parquet file with the first three entries in sogamo dataset and then loaded it to COOL system.
```bash
java -jar cool-examples/load-parquet/target/load-parquet-0.1-SNAPSHOT.jar sogamo sogamo/table.yaml sogamo/dim_test.csv sogamo/test.parquet ./test
```
The command arguments provides the table schema and dimension description for processing tuples loaded from parquet file and generate the native cool data files. 
* `sogamo`: name of the dataset
* `sogamo/table.yaml`: the table.yaml describing the table schema
* `sogamo/dim_test.csv`: the dimension file 
* `sogamo/test.parquet`: the raw data in parquet format
* `test`: the output directory to store the converted dataset 