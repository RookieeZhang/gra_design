import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, message, Modal, Select, Table} from 'antd';
import type {TableColumnsType} from 'antd';
import {
  deleteProductsUsingPost,
  editProductsUsingPost,
  listProductsUsingPost
} from "@/services/swagger/productsController";
import {deleteUserUsingPost, listUserByPageUsingPost, updateUserUsingPost} from "@/services/swagger/userController";

const App: React.FC = () => {
  const [datasource, setDatasource] = useState<API.User[]>([]);
  const [userQueryRequest, setUserQueryRequest] = useState<API.UserQueryRequest>({});

  /**
   * 获取产品列表
   */
  const getDatasource = async () => {
    const res = await listUserByPageUsingPost(
      userQueryRequest as API.UserQueryRequest
    );
    if (res.code === 0) {
      if (res.data !== null) {
        setDatasource(res.data.records);
      }
    }
  }

  const columns: TableColumnsType<API.User> = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      title: '用户账号',
      width: 100,
      dataIndex: 'userAccount',
      fixed: 'left',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      width: 150,
    },
    {
      title: '用户权限',
      dataIndex: 'userRole',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: (record) => (
        <>
          <a style={{marginRight: 8}} onClick={
            () => {
              Modal.confirm({
                title: '编辑',
                width: 600,
                footer: null,
                content: (
                  <Form
                    initialValues={{
                      id: record.id,
                      userAccount: record.userAccount,
                      userName: record.userName,
                      userRole: record.userRole,
                      userPassword: record.userPassword,
                      createTime: record.createTime,
                      updateTime: record.updateTime
                    }}
                    onFinish={
                      async (values: API.UserUpdateRequest) => {
                        const res = await updateUserUsingPost({
                          id: record.id,
                          ...values
                        });
                        if (res.code === 0) {
                          message.success('编辑成功')
                          Modal.destroyAll()
                          getDatasource()
                        } else {
                          message.error(res.message)
                        }
                      }
                    }
                  >
                    <Form.Item label="账号" name="userAccount">
                      <Input/>
                    </Form.Item>
                    <Form.Item label="用户名" name="userName">
                      <Input/>
                    </Form.Item>
                    <Form.Item
                      label="用户角色"
                      name="userRole"
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item label="密码" name="userPassword">
                      <Input/>
                    </Form.Item>
                    <Form.Item label="创建时间" name="createTime">
                      <Input disabled/>
                    </Form.Item>
                    <Form.Item label="更新时间" name="updateTime">
                      <Input disabled/>
                    </Form.Item>
                    <Form.Item label={null}>
                      <Button type="primary" htmlType="submit" style={{marginRight: 8}}>
                        提交
                      </Button>
                      <Button onClick={() => Modal.destroyAll()}>
                        取消
                      </Button>
                    </Form.Item>
                  </Form>
                )
              });
            }}>编辑</a>
          <a style={{color: 'red'}} onClick={async () => {
            const res = await deleteUserUsingPost({id: record.id})
            if (res.code === 0) {
              message.success('删除成功')
              getDatasource()
            } else {
              message.error(res.message)
            }
          }}>删除</a>
        </>
      ),
    },
  ];

  useEffect(() => {
    getDatasource() // Populate the form with the current datasource values
  }, []);


  return (
    <Table<API.User>
      columns={columns}
      dataSource={datasource}
      pagination={{
        position: ['bottomCenter']
      }}
      style={{margin: 0}}
      scroll={{x: 'max-content', y: 'calc(90vh - 200px)'}}
    />
  );
};

export default App;
