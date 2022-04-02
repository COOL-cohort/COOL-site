---
id: compression
title: Compression
tags: [compression]
---
# Compression
Values of a field in either MetaChunks or DataChunks and output cohorts are compressed to reduce the storage footprint. COOL uses different strategies tailed for the types of data to compress.

## Compressor
A Compressor contains one specific compression strategy for a list of values. COOL currently provides the following compressors.

### BitVectorCompressor
A list of non-negative intergers is compressed into a bit vector of n bits (n being the max value among them). A bit is turned on if the corresponding integer is present in the list.

### DeltaCompressor
A list of integer is compressed with delta encoding. The min and max values are recorded and the deltas are fed into a ZIntCompressor. It is applied to [Metric](schema.md#metric)

### LZ4JavaCompressor
LZ4 is used for compress string values in COOL.

### RLECompressor
Run length encoding (RLE) is applied to integer sequence in which same data value occurs in consecutively. It is applied to [UserKey](schema.md#userkey).

### SimpleBitSetCompressor
It is used to compress bitsets with RLE. It is used to store pre-calculated bit set of a field.

### ZIntCompressor
ZintCompressors aims to use the least bytes (among 1, 2 and 4 bytes) to pack integers in a buffer. It is used to compress values of a field in DataChunk. 

### ZIntBitCompressor
It is used to compress integer field values when other Interger compression is not suitable. Also it is currently used to compress the cohort result in cohort selection.

## Histogram
Histogram describes the characteristic of a sequence of values, including sorted, min, max, count, etc.

## CompressorAdvisor and CompressorFactory
CompressorAdvisor picks the suitable compressor based on Histogram and CompressorFactory creates the compressor.

## OutputCompressor
OutputCompressor writes out data in compressed format.

## Extension
Developers are welcome to introduce new compression methods by implementing the p[Compressor](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/io/compression/Compressor.java) interface, modify the [CompressorFactory](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/io/compression/CompressorFactory.java) with a matching [Codec](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/schema/Codec.java), and changes the codec assignment for an internal data structure in [CompressorAdvisor](https://github.com/COOL-cohort/COOL/blob/main/cool-core/src/main/java/com/nus/cool/core/io/compression/CompressorAdviser.java).