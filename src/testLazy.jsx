import React, { Component, lazy, Suspense } from 'react';

const About = lazy(() => import(/*webpackChunkName:"about"*/'./About.jsx'))

export default class TsetLay extends Component {
    state = {
        hasError: false
    }
    // componentDidCatch(){
    //     this.setState({
    //         hasError:true
    //     })
    // }

    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }
    render() {
        if (this.state.hasError) {
            return <div>error</div>
        }
        return <div>
            <Suspense fallback={<div>Loading....</div>}>
                <About></About>
            </Suspense>
        </div>
    }
}

