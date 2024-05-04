import { Form, Tabs, version } from 'antd';
import { FormInstance, FormProps } from 'antd/es/form';
import { compareVersions } from 'compare-versions';
import React from 'react';
import { ControlMap } from './control-map';
// import styles from './index.less';

export interface Option {
  label: string;
  value: string | number | boolean;
}

export type DependencyField = string | number | (string | number)[] | undefined;

export interface DependencyItem {
  name: DependencyField; // 为 undefined 时，说明不是依赖单独字段
  type?: 'function'; // type 表示依赖项的类型，非字段时，只支持函数
  condition: string | number | boolean | { (args: any): boolean }; // 条件值
  hidden?: boolean; //是否被隐藏
  disabled?: boolean; // 是否被禁用
}

export interface ControlSchema {
  type: 'String' | 'Number' | 'Boolean';
  shape: string;
  name: string | number | (string | number)[];
  label: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  disabled: boolean;
  required: boolean;
  tooltip?: string;
  extra?: string;
  placeholder?: string;
  hidden: boolean;
  options?: Option[];
  originData?: Record<string, any>; // 原始数据
  dependencies?: DependencyItem[];
}

export interface Tab {
  name: string;
  controls: ControlSchema[];
}

export type Schema = Tab[];

interface Props extends FormProps {
  schema: Schema;
  className?: string;
  form?: FormInstance;
}

export const SchemaForm: React.FC<Props> = (props) => {
  const { schema, className, form: formInstance, ...otherProps } = props;
  const [form] = Form.useForm(formInstance);

  const renderControlComponent = (control: ControlSchema) => {
    const { shape, name: controlName } = control;
    const ControlComponent = ControlMap.getComponent(shape);
    if (!ControlComponent) {
      console.error('未找到对应的控件', shape);
      return null;
    }
    return <ControlComponent key={controlName} controlSchema={control} />;
  };

  return (
    <Form
      size="small"
      form={form}
      layout="vertical"
      className={className}
      {...otherProps}
    >
      {/* antd version >= 4.23.0 时, 建议用 Tabs.items 写法 */}
      {compareVersions(version, '4.23.0') >= 0 ? (
        <Tabs
          type="card"
          defaultActiveKey={schema[0]?.name}
          // className={classNames(styles.tabs, styles.controlNumberTab, {
          //   [styles.singleTab]: schema?.length === 1,
          //   [styles.coupleTab]: schema?.length === 2,
          //   [styles.ternateTab]: schema?.length === 3,
          // })}
          items={schema.map((tab) => ({
            key: tab.name,
            label: tab.name,
            children: tab.controls.map(renderControlComponent),
          }))}
        />
      ) : (
        <Tabs
          type="card"
          defaultActiveKey={schema[0]?.name}
          // className={classNames(styles.tabs, styles.controlNumberTab, {
          //   [styles.singleTab]: schema?.length === 1,
          //   [styles.coupleTab]: schema?.length === 2,
          //   [styles.ternateTab]: schema?.length === 3,
          // })}
        >
          {schema.map((tab: Tab) => {
            const { name: tabName, controls } = tab;
            return (
              <Tabs.TabPane key={tabName} tab={tabName}>
                {controls.map(renderControlComponent)}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      )}
    </Form>
  );
};
