import React from "react";
import axios from "axios"
import {BASE_URL} from "../App";
import {RouteComponentProps} from "react-router-dom";
import {Shorturl} from "../types/types";

interface Parameters {
    id?: string
}

interface State {
}

export class Redirect extends React.Component<RouteComponentProps<Parameters>, State> {
    private readonly id: string;

    constructor(props: RouteComponentProps<Parameters>) {
        super(props);
        this.id = props.match!.params!.id!;
    }

    render() {
        return (
            <h4>
                Wait to be redirected to the requested url..
            </h4>
        );
    }

    async componentDidMount() {
        await this.redirect();
    }

    private async redirect() {
        let short = await this.findById();
        window.location.assign(short.url!);
    }

    async findById(): Promise<Shorturl> {
        let resp = await axios.get<Shorturl>(`${BASE_URL}${this.id}`)
        return resp.data;
    }

}