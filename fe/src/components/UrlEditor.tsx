import {Shorturl} from "../types/types";
import React from "react";
import {Button, Card, Form, Input} from "antd";
import {FormInstance, FormItemProps} from "antd/es/form";

export interface Props {
    url: Shorturl;
    onSubmit: (item: Shorturl) => void;
    onFormError: (error: string) => void;
}
export interface State {
    formError: boolean
}

export class UrlEditor extends React.Component<Props, State> {
    private formRef: React.RefObject<FormInstance>;

    constructor(props: Props) {
        super(props);
        this.state = {
            formError: false
        }
        this.formRef = React.createRef<FormInstance>()
    }

    render() {

        return (
            <Card title="Enter the URL to be shortened" >
                <Form
                    ref={this.formRef}
                    labelCol={{span: 4, offset: 2}}
                    wrapperCol={{span: 12}}
                    layout="horizontal"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item label="URL" name="url"
                               rules={[
                                   {
                                       required: true,
                                       message: 'This field is required'
                                   }
                               ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item {...({
                        wrapperCol: {
                            offset: 17
                        }
                    })}>
                        <Button type="primary" htmlType={"submit"}>Save</Button>
                    </Form.Item>

                </Form>
            </Card>
        );
    }

    onFinish = (values: any) => {
        this.setState({
            formError: false
        })
        let updated = {...this.props.url, ...values};
        this.props.onSubmit(updated);
    }

    onFinishFailed = () => {
        this.props.onFormError("Please fill out all the required fields")
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
        let url = nextProps.url;
        this.formRef.current?.setFieldsValue({
            ...url,
        })
        return false;
    }
}