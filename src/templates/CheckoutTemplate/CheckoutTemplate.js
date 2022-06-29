import { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Route } from "react-router-dom"
import { USER_LOGIN } from "../../util/settings/config"

export const CheckoutTemplate = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const { Component, ...restRoute } = props
    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    } else {
        return <Route {...restRoute} render={(propsRoute) => {
            return <>
                <Component {...propsRoute} />
            </>
        }} />
    }
}