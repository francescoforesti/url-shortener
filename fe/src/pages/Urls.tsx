import React from "react";
import axios from "axios"
import {UrlTable} from "../components/UrlTable";
import {BASE_URL} from "../App";
import {Shorturl} from "../types/types";

interface State {
    urls: Shorturl[]
}

export class Urls extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            urls: []
        }
    }

    render() {
        return (
            <div className='flex-container'>
                <div className='row' style={{padding: "1rem"}}>

                    <UrlTable urls={this.state.urls} onDelete={this.handleDelete}/>

                </div>
            </div>
        );
    }

    async componentDidMount() {
        await this.refresh();
    }

    handleDelete = async (id: string) => {
        await axios.delete(`${BASE_URL}${id}`)
        await this.refresh();
    }

    private async refresh() {
        let appointments = (await axios.get<Shorturl[]>(`${BASE_URL}`)).data;
        this.setState({urls: appointments});
    }
}