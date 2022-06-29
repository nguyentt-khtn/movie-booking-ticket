import { useEffect } from "react"
import { Route } from "react-router-dom"
import Footer from "./Layout/Footer/Footer"
import Header from "./Layout/Header/Header"

export const HomeTemplate = (props) => {

    const { Component, ...restRoute } = props
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return <Route {...restRoute} render={(propsRoute) => {

        return <>
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            <div className="mt-2 mb-2">
                <hr />
            </div>
            <Footer />
        </>
    }} />
}
