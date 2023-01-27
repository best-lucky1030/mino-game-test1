export default function PageLoading(props: {
    loading?: boolean,
    label?: string
}) {
    if (!props.loading) return <></>;
    return (
        <div className="fixed w-full h-full flex items-center justify-center top-0 left-0">
            {props.loading ?
                <div className="page-loading">
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    {props.label &&
                        <p className="loading-label">{props.label}</p>
                    }
                </div>
                :
                <div></div>
            }
        </div>
    )
}
