import "./../styles/nav.scss"
const Nav = ({children}) => {
    return (
        <div className="nav">
            <h1>
                Wagmi Hooks Test
            </h1>
            {children}
        </div>
    )
}


export default Nav;