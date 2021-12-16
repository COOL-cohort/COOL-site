---
id: md-template
title: md-template
tag: template
---
:::warning
warning
:::

:::caution
caution
:::

:::tip
tip
:::

:::note
note
:::

:::important
important
:::

:::info
info
:::

```bash 
npm run docusaurus docs:version 1.1.0
```

Each directory in `versioned_docs/` will represent a documentation version.


```bash title="config" diff {2,4}
[
  "2.0.0",
  "1.9.0",
  "1.8.0"
]
```