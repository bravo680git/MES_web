import cl from "classnames"

function Card({ children, onCLick, className, ...props }) {
    return (
        <div
            data-component="Card"
            className={cl("rounded-xl bg-neutron-4 p-[30px] shadow-main", className)}
            onClick={onCLick}
            {...props}
        >
            {children}
        </div>
    )
}

export default Card
