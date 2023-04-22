import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import { Layout, Row, Typography, Form, Input, Button, Space, Spin, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import styles from './index.module.scss';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useTypedSelector from 'hooks/useTypedSelector';
import { fetchCharacterRequest, updateCharacter } from 'store/character/action';
import { ICharacter } from 'store/character/types';
import { Link } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const DetailCharacter = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const {id} = useParams();

	const { data: person, loading, error } = useTypedSelector(state => state.character);

  const [form] = useForm();

	useEffect(() => {
		if (id && dispatch) {
      dispatch(fetchCharacterRequest(id));
		}
  }, [id, dispatch]);
  
  useEffect(() => {
    if (error) {
      setOpen(true);
      const timeout = setTimeout(() => {
        setOpen(false);
      }, 3000);

      return (() => clearTimeout(timeout));
    }
  }, [error])

	useEffect(() => {
    if (!!Object.keys(person).length && form) {
      form.setFieldsValue({...person});
    }
	}, [person, form])
	
	const onFinish = (values: ICharacter) => {
		id && dispatch(updateCharacter(values, id));
  };
  
  const onReset = () => {
    form.resetFields();
  };
	
  return (
    <>
      {error && (
        <Modal 
          title = {<><ExclamationCircleFilled  style={{ color: 'red' }}/> {error}</>}
          open={open}
          footer={null}
        />
      )}
      <Layout>
        <Row justify="start">
          <Link to={'/'}>
            <Button>Назад</Button>
          </Link>
        </Row>
        </Layout>
      <Layout>
        <Row justify="center">
          <Typography.Title level={1}>{person?.name}</Typography.Title>
        </Row>
      </Layout>

      <Layout.Content className={styles.DetailCharacter}>
        {loading && (
          <div className={styles.DetailCharacter__Loading}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Spin tip="Loading..." />
            </Space>
          </div>
        )}
        <Row justify="center">
          <Form {...layout} form={form} onFinish={onFinish} initialValues={person} style={{ maxWidth: 600 }}>
            <Form.Item name="name" label="Name">
              <Input maxLength={36} disabled />
            </Form.Item>
            <Form.Item name="height" label="Height" rules={[{ required: true }]}>
              <Input maxLength={36} />
            </Form.Item>
            <Form.Item name="mass" label="Mass" rules={[{ required: true }]}>
              <Input maxLength={36} />
            </Form.Item>
            <Form.Item name="hair_color" label="Hair Color" rules={[{ required: true }]}>
              <Input maxLength={36} />
            </Form.Item>
            <Form.Item name="skin_color" label="Skin Color" rules={[{ required: true }]}>
              <Input maxLength={36} />
            </Form.Item>
            <Form.Item name="eye_color" label="Eye Color" rules={[{ required: true }]}>
              <Input maxLength={36} />
            </Form.Item>
            <Form.Item name="birth_year" label="Birth Year" rules={[{ required: true }]}>
              <Input maxLength={36} />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
              <Input maxLength={36} />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space direction="vertical">
                <Space wrap>
                  <Button type="primary" htmlType="submit" className={styles.DetailCharacter__Save}>
                    Save
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                </Space>
              </Space>
            </Form.Item>
          </Form>
        </Row>
      </Layout.Content>
    </>
  )
}

export default DetailCharacter;