import {Shorturl} from "../types/types";
import React from "react";
import {Button, Form, Input} from "antd";
import {FormInstance, FormItemProps} from "antd/es/form";

export interface Props {
    url: Shorturl;
    onSubmit: (item: Shorturl) => void
}

export class UrlEditor extends React.Component<Props, {}> {
    private formRef: React.RefObject<FormInstance>;

    constructor(props: Props) {
        super(props);
        this.formRef = React.createRef<FormInstance>()
    }

    render() {

        const tailLayout: FormItemProps = {
            wrapperCol: {
                span: 2,
                offset: 18
            }
        };

        return (
            <div style={{padding: "1rem", marginTop: "5vh"}}>
                <Form
                    ref={this.formRef}
                    labelCol={{span: 4, offset: 1}}
                    wrapperCol={{span: 12, offset: 3}}
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
                    <Form.Item {...tailLayout}>
                        <Button htmlType={"submit"}>Save</Button>
                    </Form.Item>

                </Form>
            </div>
        );
    }

    onFinish = (values: any) => {
        let updated = {...this.props.url, ...values};
        this.props.onSubmit(updated);
    }

    onFinishFailed = () => {
        window.alert("something went wrong")
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
        let url = nextProps.url;
        this.formRef.current?.setFieldsValue({
            ...url,
        })
        return false;
    }
}