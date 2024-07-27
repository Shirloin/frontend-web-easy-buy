import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ShopService from "../services/ShopService"
import { useAuth } from "../contexts/AuthContext"

export const SellerRoute = () => {
    const { hasShop, setHasShop } = useAuth()
    const location = useLocation()

    useEffect(() => {
        const checkHasShop = async () => {
            try {
                const response = await ShopService.getUserShop();
                const shop = response.data.shop
                if (shop != null) {
                    setHasShop(true)
                }
                else {
                    setHasShop(false);
                }
            } catch (error) {
                console.log(error)
                setHasShop(false);
            }
        };
        checkHasShop();
    }, [])



    return hasShop ? (
        <Outlet />
    ) : (
        <Navigate to="/create-shop" state={{ from: location }} replace />
    )
}