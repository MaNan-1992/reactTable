import React, { Component } from "react";
import { Table, Input } from "antd";
import { deepClone } from "./utils";
import "./index.css";
const { Column, ColumnGroup } = Table;
/**
 * 表格中如果有输入框使用defaultValue
 * 参考地址https://www.h5w3.com/z/361839.html
 */
const data = [
  {
    key: 1,
    title: "111",
    text1: "2222",
    text2: "3333",
    content: "4444",
    answer: "55555",
    version: "6666",
    mark_type: "77777",
    value1: "8888",
    value2: "9999",
    children: [
      {
        key: 12,
        title: "111",
        text1: "2222",
        text2: "3333",
        content: "4444",
        answer: "55555",
        version: "6666",
        mark_type: "77777",
        value1: "8888",
        value2: "9999",
      },
      {
        key: 13,
        title: "111",
        text1: "2222",
        text2: "3333",
        content: "4444",
        answer: "55555",
        version: "6666",
        mark_type: "77777",
        value1: "8888",
        value2: "9999",
        children: [
          {
            key: 131,
            title: "111",
            text1: "2222",
            text2: "3333",
            content: "4444",
            answer: "55555",
            version: "6666",
            mark_type: "77777",
            value1: "8888",
            value2: "9999",
          },
        ],
      },
    ],
  },
  {
    key: 2,
    title: "111",
    text1: "2222",
    text2: "3333",
    content: "4444",
    answer: "55555",
    version: "6666",
    mark_type: "77777",
    value1: "8888",
    value2: "9999",
  },
];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      expandedRows: [], //展开行
    };
  }
  //添加兄弟
  addBrotherRow = (key) => {
    let data = this.state.data;
    data = dsFilter(data, key);
    const newData = deepClone(data);
    this.setState({
      data: newData,
    });
    function dsFilter(dealData, dealKey) {
      if (dealData) {
        for (let i = 0; i < dealData.length; i++) {
          if (dealData[i].children && dealData[i].children.length > 0) {
            dealData[i].children = dsFilter(dealData[i].children, dealKey);
          }
        }
        dealData.forEach((item) => {
          if (item.key === dealKey) {
            dealData.push({
              key: dealData[dealData.length - 1].key + 1,
              title: "111",
              text1: "2222",
              text2: "3333",
              content: "4444",
              answer: "55555",
              version: "6666",
              mark_type: "77777",
              value1: "8888",
              value2: "9999",
            });
          }
        });
        return dealData;
      }
    }
  };
  //添加子集
  addChildRow(key) {
    let data = this.state.data;
    data = dsFilter(data, key);
    const newData = deepClone(data);

    //更新展开行
    let rows = this.state.expandedRows;
    rows = [...rows, key];
    this.setState({
      data: newData,
      expandedRows: rows,
    });
    function dsFilter(dealData, dealKey) {
      if (dealData) {
        for (let i = 0; i < dealData.length; i++) {
          if (dealData[i].children && dealData[i].children.length > 0) {
            dealData[i].children = dsFilter(dealData[i].children, dealKey);
          }
        }
        dealData.forEach((item) => {
          if (item.key === dealKey) {
            if (item.children) {
              item.children.push({
                key: item.children[item.children.length - 1].key + 1,
                title: "111",
                text1: "2222",
                text2: "3333",
                content: "4444",
                answer: "55555",
                version: "6666",
                mark_type: "77777",
                value1: "8888",
                value2: "9999",
              });
            } else {
              item.children = [
                {
                  key: item.key + "1" - 0,
                  title: "111",
                  text1: "2222",
                  text2: "3333",
                  content: "4444",
                  answer: "55555",
                  version: "6666",
                  mark_type: "77777",
                  value1: "8888",
                  value2: "9999",
                },
              ];
            }
          }
        });
        return dealData;
      }
    }
  }
  //手动点击的时候收集展开行key
  expandedRowsChange = (expandedRows) => {
    this.setState({
      expandedRows,
    });
  };
  //删除行
  deleteRow = (key) => {
    let data = this.state.data;
    data = dsFilter(data, key);
    this.setState({
      data,
    });
    function dsFilter(dealData, dealKey) {
      for (let i = 0; i < dealData.length; i++) {
        if (dealData[i].children && dealData[i].children.length > 0) {
          dealData[i].children = dsFilter(dealData[i].children, dealKey);
        }
      }
      return dealData.filter((item) => item.key !== dealKey);
    }
  };
  //修改行内容
  changRow = (record,type, e) => {
    let data = this.state.data;
    data = dsFilter(data, record.key);
    console.log(data)
    this.setState({
      data,
    });
    function dsFilter(dealData, dealKey) {
      for (let i = 0; i < dealData.length; i++) {
        if (dealData[i].children && dealData[i].children.length > 0) {
          dealData[i].children = dsFilter(dealData[i].children, dealKey);
        }
      }
      dealData.forEach((item) => {
        if (item.key === dealKey) {
          item[type]=e.target.value
        }
      });
      return dealData;
    }
  };
  render() {
    return (
      <div>
        <h1 className="title">React Ant Design树形表格的复杂增删改操作</h1>
        <Table
          dataSource={this.state.data}
          bordered
          pagination={false}
          expandedRowKeys={this.state.expandedRows}
          onExpandedRowsChange={this.expandedRowsChange}
        >
          <Column
            title="题目"
            dataIndex="title"
            key="title"
            align="center"
            render={(title, record) => (
              <Input
                placeholder="题目"
                defaultValue={title}
                onChange={(e) => this.changRow(record, "title", e)}
              />
            )}
          />
          <ColumnGroup title="类型">
            <Column
              title="一级"
              dataIndex="text1"
              key="text1"
              align="center"
              render={(text1, record) => (
                <Input
                  placeholder="类型"
                  defaultValue={text1}
                  onChange={(e) => this.changRow(record, "text1", e)}
                />
              )}
            />
            <Column
              title="二级"
              dataIndex="text2"
              key="text2"
              align="center"
              render={(text2, record) => (
                <Input
                  placeholder="二级"
                  defaultValue={text2}
                  onChange={(e) => this.changRow(record, "text2", e)}
                />
              )}
            />
          </ColumnGroup>
          <Column
            title="内容"
            dataIndex="content"
            key="content"
            align="center"
            render={(content, record) => (
              <Input
                placeholder="内容"
                defaultValue={content}
                onChange={(e) => this.changRow(record, "content", e)}
              />
            )}
          />
          <Column
            title="答案"
            dataIndex="answer"
            key="answer"
            align="center"
            render={(answer, record) => (
              <Input
                placeholder="答案"
                defaultValue={answer}
                onChange={(e) => this.changRow(record, "answer", e)}
              />
            )}
          />
          <Column
            title="类型"
            dataIndex="version"
            key="version"
            align="center"
            render={(version, record) => (
              <Input
                placeholder="类型"
                defaultValue={version}
                onChange={(e) => this.changRow(record, "version", e)}
              />
            )}
          />
          <Column
            title="版本"
            dataIndex="mark_type"
            key="mark_type"
            align="center"
            render={(mark_type, record) => (
              <Input
                placeholder="版本"
                defaultValue={mark_type}
                onChange={(e) => this.changRow(record, "mark_type", e)}
              />
            )}
          />
          <Column
            title="一级内容点"
            dataIndex="value1"
            key="value1"
            align="center"
            render={(value1, record) => (
              <Input
                placeholder="一级内容点"
                defaultValue={value1}
                onChange={(e) => this.changRow(record, "value1", e)}
              />
            )}
          />
          <Column
            title="二级内容点"
            dataIndex="value2"
            key="value2"
            align="center"
            render={(value2, record) => (
              <Input
                placeholder="二级内容点"
                defaultValue={value2}
                onChange={(e) => this.changRow(record, "value2", e)}
              />
            )}
          />
          <Column
            title="操作"
            key="action"
            align="center"
            render={(text, record) => (
              <div style={{ width: "200px" }}>
                <span
                  onClick={(e) => this.addBrotherRow(record.key, e)}
                  style={{ margin: "10px", cursor: "pointer" }}
                >
                  添加兄弟
                </span>
                <span
                  onClick={(e) => this.addChildRow(record.key, e)}
                  style={{ margin: "10px", cursor: "pointer" }}
                >
                  添加子集
                </span>
                <span
                  onClick={(e) => this.deleteRow(record.key, e)}
                  style={{ cursor: "pointer" }}
                >
                  删除
                </span>
              </div>
            )}
          />
        </Table>
      </div>
    );
  }
}
