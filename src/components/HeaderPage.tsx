
type TitleProp = {
    Title: string
}

export const HeaderPage: React.FC<TitleProp> = ({ Title }) => {
    return (
        <>
            <div className="h-[10vh]  items-center justify-center flex shapedividers ">
                <h3 className="m-2   z-20 text-3xl absolute text-white">{Title}</h3>
            </div>
        </>
    )
}