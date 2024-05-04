## 基本示例

Demo:

```tsx
import React from 'react';
import { SchemaForm } from '@yunai/schema-form';

const schema = [
  {
    name: '节点属性',
    controls: [
      {
        shape: 'Input',
        name: 'id',
        label: '节点 id',
        defaultValue: '',
        value: 123,
        disabled: true,
        required: false,
        hidden: false,
      },
      {
        shape: 'Input',
        name: 'name',
        label: '节点名称',
        defaultValue: '',
        value: 123,
        disabled: true,
        required: false,
        hidden: false,
      },
      {
        shape: 'InputNumber',
        name: 'x',
        label: '位置：x',
        defaultValue: '',
        value: 123,
        disabled: true,
        required: false,
        hidden: false,
      },
      {
        shape: 'InputNumber',
        name: 'y',
        label: '位置：y',
        defaultValue: '',
        value: 123,
        disabled: true,
        required: false,
        hidden: false,
      },
      {
        shape: 'Datetime',
        name: 'modifiedTime',
        label: '修改时间',
        defaultValue: '',
        value: '',
        disabled: true,
        required: false,
        hidden: false,
      },
    ],
  },
  {
    name: '节点配置',
    controls: [
      {
        shape: 'Input',
        name: 'param',
        label: '节点参数',
        defaultValue: '',
        value: '',
        disabled: false,
        required: false,
        hidden: false,
      },
    ],
  },
];

export default () => (
  <div style={{ width: 300, minHeight: 500, border: '1px solid #d9d9d9' }}>
    <SchemaForm schema={schema} onFieldsChange={console.log} />
  </div>
);
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
