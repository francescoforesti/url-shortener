import React from "react";
import {Button, Popconfirm, Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {Link} from "react-router-dom";
import Title from "antd/es/typography/Title";
import {Shorturl} from "../types/types";

interface Props {
    urls: Shorturl[],
    onDelete: (id: string) => void
}

export class UrlTable extends React.Component<Props, {}> {

    columns: ColumnsType<Shorturl> = [
        {
            title: 'long url',
            dataIndex: 'url',
        },
        {
            title: 'short url',
            dataIndex: 'shortened',
        },
        {
            title: "Go",
            render: (text: string, record: Shorturl) => <Link to={`/${record.shortened}`}>Go</Link>
        },
        {
            title: "Edit",
            render: (text: string, record: Shorturl) => <Link to={`/urls/${record.shortened}`}>Edit</Link>
        },
        {
            title: "Delete",
            render: (text: string, record: Shorturl) => <Popconfirm
                title="Are you sure to delete this item?"
                onConfirm={() => this.props.onDelete(record.shortened!)}
                okText="Yes"
                cancelText="No"
            >
                <a href="#">Delete</a>
            </Popconfirm>
        }
    ]

    render() {
        const header = (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Title level={5}>Shortened URLs</Title>
                <Link to="/urls/new">
                    <Button type="primary">Create</Button>
                </Link>
            </div>
        )
        return (
            <Table rowKey="shortened"
                   columns={this.columns}
                   dataSource={this.props.urls}
                   title={() => header}
                   pagination={{ pageSize: 10 }}/>
        )
    }
}