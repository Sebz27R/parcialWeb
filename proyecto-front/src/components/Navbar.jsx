import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, checkMembershipStatus } = useContext(ShopContext)
    
    // Estado para verificar si el usuario tiene membresía
    const [hasMembership, setHasMembership] = useState(false)

    useEffect(() => {
        const checkMembership = async () => {
            if (token && token !== '') {
                const membershipStatus = await checkMembershipStatus(token);  // Espera a que la promesa se resuelva
                setHasMembership(membershipStatus);  // Establece el estado con el valor resuelto
                console.log("Membership status:", membershipStatus);  // Ahora muestra el valor correcto
            }
        };
    
        checkMembership();
    }, [token]); // Solo se vuelve a ejecutar si el token cambia (cuando el usuario inicia/cierra sesión)

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        setHasMembership(false)  // Resetear el estado de membresía al hacer logout
        navigate('/login')
    }

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
                <img src='https://cdn2.steamgriddb.com/logo/70dc431987c296785a0a7888f3fe7ecb.png' className='w-36' alt="" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/models' className='flex flex-col items-center gap-1'>
                    <p>MODELS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/products' className='flex flex-col items-center gap-1'>
                    <p>PRODUCTS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/events' className='flex flex-col items-center gap-1'>
                    <p>EVENTS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/photos' className='flex flex-col items-center gap-1'>
                    <p>PHOTOS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                {/* Aquí se agrega el nuevo link SusProducts solo si el usuario tiene membresía */}
                {token && hasMembership && (
                    <NavLink to='/suspicious-page' className='flex flex-col items-center gap-1'>
                        <p>SUS-PRODUCTS</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                )}
                <NavLink to='/memberships' className='flex flex-col items-center gap-1'>
                    <p>MEMBERSHIPS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src='https://icons.veryicon.com/png/o/miscellaneous/light-e-treasure-3/search-286.png' className='w-8 cursor-pointer' alt="" />

                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/login')} className='w-8 cursor-pointer' src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png' alt="" />
                    
                    {token &&
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black'>My profile </p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>}
                </div>
                <Link to='/cart' className='relative'>
                    <img src='https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png' className='w-7 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 
                    bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src='https://www.freeiconspng.com/thumbs/menu-icon/menu-icon-24.png' className='w-7 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* Mobile menu */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src='https://static.thenounproject.com/png/1123247-200.png' className='h-4 rotate-90' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/models'>MODELS</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/products'>PRODUCTS</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/events'>EVENTS</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/photos'>PHOTOS</NavLink>
                    {/* Mismo condicional para el móvil */}
                    {hasMembership && (
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/susproducts'>SusProducts</NavLink>
                    )}
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/memberships'>MEMBERSHIPS</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
