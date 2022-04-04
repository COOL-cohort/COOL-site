---
sidebar_position: 1
id: introduction
title: Introduction to COOL
tags: [introduction]
---

COOL is a cohort OLAP system specialized for cohort analysis with extremely low latency, thus suitable for large-scale user behavior analysis.
The vision of COOL is to address the inefficiency of underlying database systems processing cohort analysis (cohort queries) that is an emerging and widely-used analysis pattern in various areas. 
By utilizing COOL, we can quickly get clear and explainable user behavioral analytical results which can be used for further downstream tasks. 

Based on the user behavior analysis, COOL can be widely applied in various areas:
- **Healthcare Analytics**
- **Electronic medical record analysis**
- **Customer Relationship Management (CRM) Analytics**
- **Retention analysis in financial area**
- **Anomaly detection in physical system**
- **Anti-fraud in e-commerce platform**
- **Advertising analytics**

### Key features of COOL

1. **Easy to use.** COOL provides user-friendly API, thus allowing users to easily deploy a web app to utilize COOL on local or on cloud via docker.
2. **Near Real-time Responses.** COOL is highly efficient, and therefore, can process cohort queries in near real-time analytical responses.
3. **Scalable distributed architecture.** COOL can be extened for distributed processing to serve big data needs without compromising the ability and efficiency in supporting both OLAP and cohort queries.
4. **Specialized Storage Layout.** A specialized storage layout is designed for fast query processing and reduced space consumption.
5. **Self-designed Semantics.** There are some novel self-designed semantics for the cohort query, which can simplify its complexity and improve its functionality.
6. **Flexible Integration.** Since COOL supports various types of data, it can be integrated with other data systems via common data formats e.g., CSV, Parquet, Avro, and Arrow. This also makes COOL suitable for many different application scenarios.
7. **Artificial Intelligence Model.** COOL can learn comprehensive cohort behavior representations to facilitate further artificial intelligence models development.

Different from the traditional statistical analysis where analytical results are too rough to reveal meaningful data patterns, COOL is specialized for cohort analysis which allows us to learn the sophisticated data patterns across the life-cycle of users.

### What it cohort analysis?
Cohort analysis is of great importance since it can provide the specificity of the data information and capture comprehensive users' behavioral patterns which cannot be learned by traditional statistical analytics.
In detail, users are usually divided into different cohorts where they share common behavior characteristics in a specific time period, such as the patients who have taken a certain medicine or the customers who register on the same day. 
The purpose of the cohort analysis is to visually display the common activities of specific cohorts at different stages in their life-cycles, and compare them with other cohorts at the same stage.

Therefore, cohort analysis is valuable because it can provide fine-grained analytical results about each specific cohort's behavior activities by only investigating the relevant data. It allows companies to know how user behaviors affect their business, and hence, optimize their own conversion funnel.

### Why do we need COOL?

When conducting cohort analysis, response time and the complexity of the cohort query are two essential considerations that will influence the effectiveness of downstream applications.
- **Need for low response time.** When conducting consumer retention analysis, we observe the growth of users alongside running the user acquisition or observe player progression in online gaming to evaluate how different groups of players evolve at different time stages. The efficiency of cohort query processing is vital in such a scenario as analysts may have to work out strategies promptly for the online service.
- **Need for simplicity of cohort query.** In healthcare, cohort analysis can evaluate the side-effect of a clinical trial, in which the clinicians want to monitor and determine the effectiveness of new medicines among different patient groups. However, it is difficult for any clinician to construct complex cohort queries (using SQL) to conduct cohort analysis. Specifically, at least five SQL queries are needed for a conventional OLAP database system to perform cohort analysis in a non-intrusive manner.

The design of OLAP systems cannot serve modern applications well due to their inefficiency in processing complex queries such as cohort queries with low query latency. 
As a cohort online analytical processing system, COOL can support several newly proposed operators on top of a sophisticated storage layer and processes both cohort queries and conventional OLAP queries with superb performance. 
Besides, its distributed design contains minimal load balancing and fault tolerance support and is scalable.
With such designs, the COOL system is able to process complicated cohort queries with **flexible definitions of cohorts and events** in ** near real-time response time**.
It is at least one order of magnitude faster than cohort processing using a conventional database engine.
For ease of use, COOL accepts a single self-defined query in JSON format, rather than multiple complex SQL statements.


### When to use COOL?

COOL has been used for various real-world applications, such as sales of online game gadgets/equipment, sales of virtual assets and gears in online games, and drug side-effects in medical analysis. Cohort analysis is of great importance since it can provide the specificity of the data information and capture users' behavioral patterns which cannot be learned by traditional data analytics.
More specifically, COOL is the perfect system for you if you have any requirements as follows:
1. **Temporal behavior analytics.** Want to learn user behavioral patterns from time-series data.
2. **Need for grouping.** Want to split users into several groups by demographic information or events before conducting cohort analysis.
3. **The application requires real-time responses.** Want near real-time responses for processing cohort queries and conventional OLAP queries.
4. **Easy to use.** Want the cohort queries to be defined easily and flexibly.
5. **Scalability.** Want the system to be scalable
6. **Deal with various data formats.** Want to load the data from various data formats.

### Learn more 
- Try the COOL [Quickstart](/docs/getting-started/quickstart)
- Learn more from COOL [tutorials](/docs/tutorials/tutorial-input-format)
- Read the [academic research papers](/docs/publication/paper) to learn COOL in details.