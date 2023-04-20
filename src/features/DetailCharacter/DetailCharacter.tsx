import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';

import { Layout, Row, Typography, Form, Input, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import styles from './index.module.scss';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useTypedSelector from 'hooks/useTypedSelector';
import { fetchCharacterRequest, updateCharacter } from 'app/store/character/action';
import { ICharacter } from 'app/store/character/types';


const DetailCharacter = () => {
	const dispatch = useAppDispatch();

	const {id} = useParams();

	const { data: person } = useTypedSelector(state => state.character);

	const [form] = useForm();

	useEffect(() => {
		if (id) {
			dispatch(fetchCharacterRequest(id));
		}
	}, [id]);

	useEffect(() => {
		form.setFieldsValue({...person});
	}, [person])
	
	const onFinish = (values: ICharacter) => {
		id && dispatch(updateCharacter(values, id));
	};
	
  return (
    <>
      <Layout className={styles.DetailCharacter}>
        <Row justify="center">
          <Typography.Title level={1}>{person?.name}</Typography.Title>
        </Row>
      </Layout>

      <Layout.Content className={styles.DetailCharacter}>
				<Form form={form} onFinish={onFinish} initialValues={person}>
					<Form.Item name="name" label="Name" rules={[{ required: true }]}>
						<Input maxLength={36} />
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
					<Form.Item>
						<Row justify="center">
							<Button type="primary" htmlType="submit">
								Save
							</Button>
						</Row>
					</Form.Item>
				</Form>
      </Layout.Content>
    </>
  )
}

export default DetailCharacter;