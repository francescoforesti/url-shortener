import React from "react";
import axios from "axios";
import {RouteComponentProps} from "react-router-dom";
import {BASE_URL} from "../App";
import {UrlEditor} from "../components/UrlEditor";
import {Shorturl} from "../types/types";
import {Alert} from "antd";

interface Parameters {
    id?: string
}

interface State {
    url: Shorturl
    serverError?: string;
}

export class EditUrl extends React.Component<RouteComponentProps<Parameters>, State> {

    id?: string;

    constructor(props: RouteComponentProps<Parameters>) {
        super(props);
        this.state = {
            url: {} as Shorturl,
            serverError: undefined
        };
        if (props.match?.params?.id) {
            this.id = props.match.params.id;
        }
    }

    render() {
        let alert;
        if(this.state.serverError) {
            alert = <Alert
                message="An Error has occurred"
                showIcon
                description={this.state.serverError}
                type="error"
                closable
            />
        }
        return (
            <div>
                <UrlEditor url={this.state.url} onSubmit={this.saveOrUpdate} onFormError={this.updateError}/>
                {alert}
            </div>
        );
    }

    async componentDidMount() {
        if (this.id) {
            this.setState({url: await EditUrl.findById(this.id)});
        }
    }

    saveOrUpdate = async (item: Shorturl) => {
        this.updateError(undefined);
        try {
            this.id ?
                await EditUrl.update(item, this.id) :
                await EditUrl.save(item);
            this.props.history.push('/');
        } catch(err) {
            this.updateError(err.response.data)
        }
    }

    private updateError = (errorMessage: string | undefined) => {
        this.setState({
            serverError: errorMessage
        })
    }

    private static async findById(id: string) {
        let resp = await axios.get<Shorturl>(`${BASE_URL}${id}`)
        return resp.data;
    }

    private static async save(item: Shorturl) {
        await axios.post(`${BASE_URL}`, item);
    }

    private static async update(item: Shorturl, id: string) {
        await axios.put<Shorturl>(`${BASE_URL}${id}`, item);
    }


}